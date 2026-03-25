import fs from "fs";
import path from "path";

const DB_PATH = "./src/data/vectorDB.json";

// Load DB
function loadDB() {
  const dir = path.dirname(DB_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, "[]");
    return [];
  }

  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

// Save DB
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Store embeddings
export function storeEmbeddings(newEmbeddings) {
  const db = loadDB();

  const existingIds = new Set(db.map(item => item.id));

  // avoid duplicate IDs
  const filtered = newEmbeddings.filter(e => !existingIds.has(e.id));

  const updatedDB = [...db, ...filtered];

  saveDB(updatedDB);

  console.log("Stored:", filtered.length, "new embeddings");
}

// Cosine similarity
function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Search with docId support
export function similaritySearch(queryVector, topK = 5, docId = null) {
  const db = loadDB();

  //  Filter by docId if provided
  const filteredDB = docId
    ? db.filter(item => item.docId === docId)
    : db;

  //  Limit search space
  const limitedDB = filteredDB.slice(-1000);

  const scored = limitedDB.map(item => ({
    text: item.text,
    file: item.file,
    score: cosineSimilarity(queryVector, item.vector),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}