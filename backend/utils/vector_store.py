import cohere
import faiss  # type: ignore
import numpy as np
import os 
from dotenv import load_dotenv

load_dotenv()

co = cohere.Client(os.getenv("COHERE_API_KEY"))

def create_embeddings(text_list):
    response = co.embed(
        texts=text_list,
        model="embed-english-v3.0",
        input_type="search_document"
    )
    return response.embeddings

def init_vector_store(text_chunks):
    embeddings = create_embeddings(text_chunks)
    dimension = len(embeddings[0])
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings).astype('float32'))
    return index

def get_similar_chunks(query, text_chunks, index, top_k=3):
    query_embedding = create_embeddings([query])[0]
    D, I = index.search(np.array([query_embedding]).astype('float32'), top_k)
    return [text_chunks[i] for i in I[0]]
