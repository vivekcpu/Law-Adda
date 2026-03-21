import express from "express";
import multer from "multer";
import { processDocument } from "../services/documentProcessor.js";

const router = express.Router();


const upload = multer({ dest: "src/uploads/" });

// test route
router.get("/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const text = await processDocument(filePath);

    res.json({
      success: true,
      text
    });

    console.log("Uploaded file:", req.file);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});



export default router;