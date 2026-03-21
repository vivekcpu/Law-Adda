import express from "express";
import multer from "multer";
import fs from "fs";
import crypto from "crypto";

import { processDocument } from "../services/documentProcessor.js";
import { askAI } from "../controllers/aiController.js";
import { chunkText } from "../services/chunkServices.js";
import { embedChunks } from "../services/embeddingService.js";
import { storeEmbeddings } from "../services/vectorStore.js";

const router = express.Router();

const upload = multer({ dest: "src/uploads/" });

// ✅ Test route
router.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// Ask route
router.post("/ask", askAI);

// Upload route (FULL RAG PIPELINE)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    //  Step 0: Extract text
    const result = await processDocument(filePath);
    const text = result.text;

    console.log("TEXT LENGTH:", text?.length);

    if (!text || text.length === 0) {
      throw new Error("No text extracted from document");
    }

    //  Step 1: Chunk
    const chunks = chunkText(text);
    console.log("CHUNKS:", chunks.length);

    if (!chunks.length) {
      throw new Error("Chunking failed");
    }

    //  Step 2: Embed
   const embeddingsRaw = await embedChunks(chunks);

const embeddings = embeddingsRaw.map((e) => {
  const id = crypto
    .createHash("md5")
    .update(e.text)
    .digest("hex");

  return {
    id,                // UNIQUE ID
    text: e.text,
    vector: e.vector,
    file: req.file.originalname
  };
});

    console.log("EMBEDDINGS:", embeddings.length);

    if (!embeddings.length) {
      throw new Error("Embedding failed");
    }

    //  Step 3: Store
    fs.writeFileSync("./src/data/vectorDB.json", JSON.stringify([], null, 2));
    storeEmbeddings(embeddings);
    console.log("STORED SUCCESS");

    //  Step 4: Delete uploaded file
    fs.unlinkSync(filePath);

    //  Response
    res.json({
      success: true,
      message: "File processed and indexed successfully",
      chunks: chunks.length,
      embeddings: embeddings.length
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    // try deleting file even on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;