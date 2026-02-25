# 🧠 Production-Grade GenAI Assistant with RAG

![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![RAG](https://img.shields.io/badge/Architecture-RAG-purple)
![LLM](https://img.shields.io/badge/LLM-Gemini-orange)
![Status](https://img.shields.io/badge/Status-Assessment%20Ready-success)

---

## 🎯 Objective

This project implements a **production-grade Retrieval-Augmented Generation (RAG) assistant** that retrieves information from a private knowledge base before generating responses.

The assistant is designed to:

- Reduce hallucinated answers
- Provide grounded AI responses
- Demonstrate enterprise-style GenAI architecture

---

## 🏗 Architecture Overview

```
User → React Chat UI → Express Backend API → Retrieval Engine → LLM / Offline Fallback → Response
```

### 🔄 Processing Flow

1. Documents are chunked into smaller sections
2. Embeddings are generated and stored in a vector store
3. User query is converted into an embedding
4. Cosine similarity search retrieves relevant chunks
5. Top-K context injected into system prompt
6. LLM generates grounded response
7. Offline fallback activates if API quota fails

---

## ⚙️ Tech Stack

### Backend
- Node.js
- Express.js

### Frontend
- React (Vite)

### AI & Retrieval
- Google Gemini API
- Embeddings API
- Cosine Similarity
- Retrieval-Augmented Generation (RAG)

---

## 📂 Project Structure

```
rag-assistant/
├── backend/
│   ├── data/            # Knowledge base + vector store
│   ├── scripts/         # Ingestion & testing scripts
│   ├── services/        # LLM + RAG logic
│   ├── utils/           # Vector math functions
│   └── server.js
└── frontend/
```

---

## 🔎 RAG Workflow

- Document chunking implemented
- Embeddings generated using API
- Query embedding used for similarity search
- Top 3 chunks injected into prompt
- Similarity threshold prevents hallucinations

The assistant **only answers using retrieved context**, ensuring safe and grounded outputs.

---

## 🧠 Prompt Design

System Prompt:

> "Use ONLY the provided context. If the answer is not present, respond safely."

This ensures:

- Grounded responses
- No fabricated information
- Enterprise-style safety behavior

---

## 🚀 Setup Instructions

### 1️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 📡 API Endpoint

### POST `/api/chat`

#### Request Body

```json
{
  "sessionId": "abc123",
  "message": "How do I reset my password?"
}
```

#### Response

```json
{
  "reply": "Generated response",
  "tokensUsed": 0,
  "retrievedChunks": 3
}
```

---

## 🛡 Offline Fallback Mode

If Gemini API quota is exceeded:

- System switches to local retrieval response
- Prevents runtime failure
- Demonstrates production-grade resilience

---

## 🎥 Demo

Add screenshots or demo video here:

```
/screenshot.png
```

---

## ⭐ Key Features

- Retrieval-Augmented Generation (RAG)
- Embedding-based similarity search
- Context-grounded AI responses
- Session-based conversation memory
- Error-safe frontend rendering
- Offline fallback support
- Production-style architecture

---

## 📌 Design Principles

This assistant intentionally avoids answering outside its knowledge base to:

- Prevent hallucinations
- Maintain AI safety
- Demonstrate responsible GenAI engineering

---

## 👨‍💻 Author

**Vishnu Vardhan B**  
Production GenAI RAG Assistant