const OLLAMA_GENERATE_URL =
  process.env.OLLAMA_GENERATE_URL ||
  "http://localhost:11434/api/generate";

import { embedText } from "./embeddingService.js";
import { similaritySearch } from "./vectorStore.js";

export async function askQuestion(question, docId) {
  try {
    const queryVector = await embedText(question);

    // Filter by docId
    const results = await similaritySearch(queryVector, 7, docId);

    const context = results.map(r => r.text).join("\n\n");

    //  DEFINE PROMPT OUTSIDE
   const prompt = `
You are a strict legal AI assistant.

IMPORTANT:
- You MUST format your response using VALID MARKDOWN.
- Use "###" for headings.
- Use "-" for bullet points.
- Each bullet MUST be on a new line.
- Do NOT write plain paragraphs.

If answer not found, respond EXACTLY:
### Answer
- I could not find this information in the document.

FORMAT (STRICT):

### Summary
- Point 1
- Point 2

### Key Details
- Detail 1
- Detail 2

### Risks
- Risk 1
- Risk 2

CONTEXT:
${context}

QUESTION:
${question}

ANSWER:
`;

    const response = await fetch(OLLAMA_GENERATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: prompt, 
        stream: false,
      }),
    });

    const data = await response.json();

    return {
      answer: data.response,
      sources: results.map(r => ({
        text: r.text.slice(0, 100),
        file: r.file,
      })),
    };

  } catch (error) {
    console.error("RAG error:", error);
    throw error;
  }
}