import fs from "fs";
import path from "path";

const DB_PATH = "./src/data/vectorDB.json";

function loadDB() {
  const dir = path.dirname(DB_PATH);

  //  create folder if missing
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // create file if missing
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

  // use IDs instead of text
  const existingIds = new Set(db.map(item => item.id));

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

// Search
export function similaritySearch(queryVector, topK = 5) {
  const db = loadDB();

const limitedDB = db.slice(-1000); // last 1000 entries only

  const scored = db.map(item => ({
    text: item.text,
    file: item.file,
    score: cosineSimilarity(queryVector, item.vector),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}