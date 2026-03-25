import express from "express";
import multer from "multer";
import fs from "fs";
import crypto from "crypto";

import { processDocument } from "../services/documentProcessor.js";
import { askAI } from "../controllers/aiController.js";
import { chunkText } from "../services/chunkServices.js";
import { embedChunks } from "../services/embeddingService.js";
import { storeEmbeddings } from "../services/vectorStore.js";
import { isLegalDocument } from "../services/legalValidator.js";

const router = express.Router();

const upload = multer({ dest: "src/uploads/" });

// ✅ Test route
router.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// Ask route
router.post("/ask", (req, res, next) => {
  console.log("Incoming ASK request:", req.body);
  next();
}, askAI);

//  Upload route (FIXED)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

  
    const docId = crypto.randomUUID();

  
    const result = await processDocument(filePath);
    const text = result.text;

    console.log("TEXT LENGTH:", text?.length);

    if (!text || text.length === 0) {
      throw new Error("No text extracted from document");
    }

    const isLegal = await isLegalDocument(text);

if (!isLegal) {
  fs.unlinkSync(filePath);

  return res.status(400).json({
    success: false,
    message: "Uploaded file does not appear to be a legal document"
  });
}


    const chunks = chunkText(text);
    console.log("CHUNKS:", chunks.length);

    if (!chunks.length) {
      throw new Error("Chunking failed");
    }

    
    const embeddings = await embedChunks(
      chunks,
      docId,
      req.file.originalname
    );

    console.log("EMBEDDINGS:", embeddings.length);

    if (!embeddings.length) {
      throw new Error("Embedding failed");
    }


   
    storeEmbeddings(embeddings);
    console.log("STORED SUCCESS");

    
    fs.unlinkSync(filePath);

    // RESPONSE (IMPORTANT FOR CHAT)
    res.json({
      success: true,
      message: "File processed and indexed successfully",
      docId: docId,  
      chunks: chunks.length,
      embeddings: embeddings.length
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

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