# ⚖️ LawAdda
## AI-Powered Legal Document Insight Platform

LawAdda is an AI-powered platform that simplifies complex legal documents by generating summaries, explaining clauses, and extracting key insights from uploaded contracts and agreements.

The platform allows users to upload legal PDFs and instantly receive AI-driven analysis that helps them understand complicated legal language in a simple and accessible way.

Built using MERN Stack, AI models, and modern document processing tools, LawAdda aims to make legal information easier to understand for everyone.

---

# 🚀 Features

## 📄 Document Upload

- Upload legal documents in PDF format
- Supports text extraction from documents
- OCR support for scanned files (if applicable)

---

## 🤖 AI Legal Insights

- Automatic document summarization
- Clause-level explanation
- Identification of important sections
- Simplified legal language for better understanding

---

## 🔍 Smart Document Analysis

- Highlights key clauses
- Breaks down complex legal terms
- Generates quick document insights

---

## 🌐 Modern Web Interface

- Responsive and clean UI
- Easy document upload and analysis
- User-friendly dashboard

---

# 🧠 How It Works

1. User uploads a legal document (PDF)
2. Backend extracts text from the document
3. If scanned, OCR converts images to text
4. Extracted content is processed using AI models

AI then generates:

- Document Summary
- Clause Explanations
- Key Insights

5. Results are displayed in the web interface

---

# 🏗️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Prebuilt UI Components

## Backend

- Node.js
- Express.js

## AI / NLP

- LLM Integration
- Ollama
- LangChain

## Document Processing

- PDF Parsing
- OCR (for scanned documents)

## Database (to be used in future uodates with privacy protection for users)
- Right now for privacy we delete the documents once the text is extracted and then use that text to generate output.
- MongoDB


## Storage (Optional to be added in future)

- AWS S3
- Cloudinary
