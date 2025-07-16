# 📄 PDF-Aware GenAI Chatbot

A full-stack AI chatbot that reads any uploaded PDF and answers user questions based on its content using Cohere’s LLM API.

🔗 **Live Demo:**
- **Frontend:** https://genai-chatbot.vercel.app  
- **Backend:** https://genai-chatbot.onrender.com

---

## 🚀 Features

- 📤 Upload any PDF document
- 💬 Ask questions based on that document
- 🧠 Uses embeddings + retrieval to find relevant content
- 🤖 Generates answers using Cohere's Command R+ model
- 🌐 Full-stack: React (frontend) + Flask (backend)
- ⚙️ Uses FAISS for vector similarity search

---

## 🛠️ Tech Stack

| Layer      | Tech Used         |
|------------|-------------------|
| Frontend   | React, Vercel     |
| Backend    | Flask, Render     |
| LLM API    | [Cohere Command R+](https://cohere.com) |
| Embeddings | Cohere Embeddings |
| Vector DB  | FAISS             |

---

## 📂 Project Structure

genai-chatbot/
├── frontend/ # React app (deployed to Vercel)
│ ├── src/
│ │ ├── App.js
│ │ ├── ChatBox.js
│ │ ├── api.js # Connects to backend API
├── backend/ # Flask server (deployed to Render)
│ ├── app.py
│ ├── utils/
│ │ ├── pdf_utils.py
│ │ └── vector_store.py
│ ├── .env # (Not pushed to GitHub)
│ └── requirements.txt

## 🧪 How It Works

1. PDF is uploaded and split into text chunks
2. Text chunks are embedded via Cohere's API
3. Stored in FAISS index
4. When a question is asked:
   - Embedding for query is computed
   - Top relevant chunks retrieved
   - Sent to Cohere's LLM for answering

---

## 🔐 Environment Variables

Only needed in `backend/.env`:
COHERE_API_KEY=your-real-cohere-api-key-here


Never commit your `.env` file — instead, set it in Render’s **Environment** tab.

---

## ⚙️ Deployment Setup

### ✅ Backend (Render)
- Create new Web Service from GitHub
- Root directory: `backend/`
- Start command: `python app.py`
- Add env var: `COHERE_API_KEY`
- Make sure `app.py` uses:
  ```python
  app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
✅ Frontend (Vercel)
Import from GitHub

Root directory: frontend/

Hardcode backend URL in src/api.js:
const BACKEND_URL = "(https://genai-chatbot-hql9.onrender.com)";

Deployment link:  https://genai-chatbot-delta.vercel.app/
📌 To Run Locally
# Backend
cd backend
pip install -r requirements.txt
touch .env            # Add your Cohere API key
python app.py

# Frontend
cd frontend
npm install
npm start             # Visit http://localhost:3000
