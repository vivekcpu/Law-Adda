const OLLAMA_URL = process.env.OLLAMA_GENERATE_URL || "http://localhost:11434/api/generate";

// Keyword check (fast filter)
function keywordCheck(text) {
  const legalKeywords = [
    "agreement",
    "contract",
    "clause",
    "party",
    "terms",
    "liability",
    "jurisdiction",
    "hereby",
    "witnesseth",
    "obligation"
  ];

  return legalKeywords.some(word =>
    text.toLowerCase().includes(word)
  );
}

//  AI validation (accurate)
async function aiCheck(text) {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistral",
      prompt: `
You are a strict classifier.

Determine if the following document is a LEGAL document 
(like contract, agreement, notice, affidavit, policy, etc).

Respond ONLY with:
YES or NO

Text:
${text.slice(0, 2000)}
      `,
      stream: false
    })
  });

  const data = await response.json();
  return data.response.toLowerCase().includes("yes");
}

//  Combined validator
export async function isLegalDocument(text) {
  const keywordResult = keywordCheck(text);

  // If keyword fails → reject early
  if (!keywordResult) return false;

  // If keyword passes → confirm with AI
  const aiResult = await aiCheck(text);

  return aiResult;
}