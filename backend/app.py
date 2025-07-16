from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.pdf_utils import extract_text_from_pdf
from utils.vector_store import get_similar_chunks, init_vector_store
import cohere
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

co = cohere.Client(os.getenv("COHERE_API_KEY"))

# Global state
documents = []
vector_index = None

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    file = request.files['file']
    pdf_text = extract_text_from_pdf(file)

    global documents, vector_index
    documents = pdf_text.split('. ')
    vector_index = init_vector_store(documents)

    return jsonify({"message": "PDF uploaded and processed successfully using Cohere."})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get("prompt", "")

    relevant_chunks = get_similar_chunks(prompt, documents, vector_index, top_k=3)
    context = " ".join(relevant_chunks)

    response = co.chat(
        model="command-r",
        message=prompt,
        documents=[{"title": "Context", "snippet": context}]
    )

    reply = response.text
    return jsonify({"response": reply})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render sets PORT env var
    app.run(host="0.0.0.0", port=port)

if __name__ == "__main__":
    print("Running Cohere-powered GenAI chatbot...")
    app.run(debug=True)
