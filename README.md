# ⚖️ LawAdda
### AI-Powered Legal Document Insight Platform

LawAdda is an AI-powered platform that simplifies complex legal documents by generating summaries, explaining clauses, and extracting key insights from uploaded contracts and agreements.

The platform allows users to upload legal PDFs and instantly receive AI-driven analysis that helps them understand complicated legal language in a simple and accessible way.

Built using the MERN stack, local LLMs, and modern document processing tools, LawAdda aims to make legal information easier to understand for everyone.

---

## 🚀 Features

### 📄 Document Upload
- Upload legal documents in PDF format  
- Text extraction from PDFs  
- OCR support for scanned documents  

### 🤖 AI Legal Insights
- Automatic document summarization  
- Clause-level explanations  
- Identification of important sections  
- Simplified legal language  

### 🔍 Smart Document Analysis
- Highlights key clauses  
- Breaks down complex legal terms  
- Generates quick insights  

### 🌐 Modern Web Interface
- Responsive UI (React + Tailwind)  
- Smooth document upload & chat flow  
- Dedicated chat-based analysis system  

---

## 🧠 How It Works (Workflow)

1. User uploads a legal document (`/upload` route)
2. Backend processes the file:
   - PDF parsing OR
   - OCR (for scanned documents)
3. Extracted text is passed to:
   - Legal Validator (checks if document is legal-related)
4. Text processing pipeline:
   - Chunking  
   - Embedding generation  
   - Stored in Vector DB  
5. `docId` is generated
6. User interacts via `/ask` route:
   - Query sent with `docId`
   - Relevant chunks retrieved (RAG)
   - LLM generates response
7. Results displayed in chat UI

---

## 🏗️ Project Structure
LawAdda/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── sections/
│ │ ├── App.tsx
│ │ └── main.tsx
│
├── server/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ │ ├── aiService.js
│ │ │ ├── ragService.js
│ │ │ ├── embeddingService.js
│ │ │ ├── chunkServices.js
│ │ │ ├── documentProcessor.js
│ │ │ ├── legalValidator.js
│ │ │ └── vectorStore.js
│ │ ├── middleware/
│ │ ├── utils/
│ │ │ ├── ocr.js
│ │ │ └── pdfParser.js
│ │ └── data/
│ │ └── vectorDB.json
│ │
│ ├── uploads/
│ ├── server.js
│ └── .env
 
---

## 🧰 Tech Stack

### Frontend
- React.js  
- Tailwind CSS  
- TypeScript  

### Backend
- Node.js  
- Express.js  

### AI / NLP
- Local LLM via **Ollama (Mistral)**  
- Retrieval-Augmented Generation (RAG)  

### Document Processing
- PDF Parsing  
- OCR (Tesseract - Hindi + English support)  

### Data Handling
- Custom Vector Store (JSON-based)  
- Embeddings pipeline  

### Security
- Crypto (for future secure processing & hashing)

---

## 🔐 Privacy First Approach

- Documents are **NOT stored permanently**
- Files are deleted after text extraction  
- Only processed text is used temporarily  
- No user data persistence (currently)

---

## 🔮 Future Improvements

- 🔐 Authentication & user accounts  
- ☁️ Cloud storage integration:
  - AWS S3  
  - Cloudinary  
- 🧠 Better legal-specific fine-tuned models  
- 📊 Advanced document visualization  
- 📁 Document history (secure & encrypted)  
- ⚡ Faster vector database (FAISS / Pinecone)  
- 🔒 End-to-end encryption using crypto  

---

## ⚠️ Disclaimer

**LawAdda is an AI-powered assistance tool and does NOT replace a professional lawyer.**

- The insights generated are for informational purposes only  
- Users should consult a qualified legal professional for legal advice  
- We do not guarantee legal accuracy or completeness  

---

## 📜 License

This project is licensed under the MIT License.
MIT License

Copyright (c) 2026 LawAdda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
