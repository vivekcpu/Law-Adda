const OLLAMA_GENERATE_URL =
  process.env.OLLAMA_GENERATE_URL ||
  "http://localhost:11434/api/generate";

import { embedText } from "./embeddingService.js";
import { similaritySearch } from "./vectorStore.js";

console.log("GEN URL:", process.env.OLLAMA_GENERATE_URL);

export async function askQuestion(question) {
  try {
    //  Convert query → embedding
    const queryVector = await embedText(question);

    //  Retrieve relevant chunks from Chroma
    const results = await similaritySearch(queryVector, 7);

    const context = results.map(r => r.text).join("\n\n");

    //  Send to Mistral
    const response = await fetch(OLLAMA_GENERATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: `
You are a helpful AI assistant. 

Use ONLY the context below to answer the question.

Context:
${context}

Question:
${question}

Answer:
        `,
        stream: false,
      }),
    });

    const data = await response.json();

   return {
  answer: data.response,
  sources: results.map(r =>({ 
 text: r.text.slice(0, 100),
  file: r.file
  })),
};
  } catch (error) {
    console.error("RAG error:", error);
    throw error;
  }
}