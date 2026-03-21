import Tesseract from "tesseract.js";
import path from "path";
import fs from "fs";
import poppler from "pdf-poppler";

export const OCR = async (filePath, mode) => {
  try {
    let imagePaths = [];

    //  PDF → convert to images
    if (mode === "pdf") {
      console.log("Converting PDF using pdf-poppler...");

      const outputDir = "./src/uploads";

      const opts = {
        format: "png",
        out_dir: outputDir,
        out_prefix: "page",
        page: null,   // convert all pages
        dpi: 200      // ⚡ optimized (balance speed + quality)
      };

      await poppler.convert(filePath, opts);

      // get generated images
      const files = fs.readdirSync(outputDir);

      imagePaths = files
        .filter(f => f.startsWith("page") && f.endsWith(".png"))
        .map(f => path.join(outputDir, f))
        .sort(); // ensure correct page order

      if (imagePaths.length === 0) {
        throw new Error("PDF conversion failed");
      }
    }

    //  IMAGE → direct OCR
    if (mode === "image") {
      console.log("Processing image directly...");
      imagePaths = [filePath];
    }

    let fullText = "";
    let totalConfidence = 0;

    //  PARALLEL OCR (major speed boost)
    const results = await Promise.all(
      imagePaths.map(imgPath =>
        Tesseract.recognize(imgPath, "eng+hin")
      )
    );

    for (const { data } of results) {
      fullText += data.text + "\n\n";
      totalConfidence += data.confidence;
    }

    const avgConfidence = totalConfidence / imagePaths.length;

    // 🧹 Clean text
    const cleanText = fullText.replace(/\s+/g, " ").trim();

 imagePaths.forEach((imgPath) => {
  try {
    fs.unlinkSync(imgPath);
  } catch (err) {
    console.log("Error deleting file:", err);
  }
});

    // 🔥 OCR QUALITY FILTER (optional but recommended)
    if (!cleanText || avgConfidence < 45) {
      return {
        success: false,
        text: cleanText,
        confidence: avgConfidence,
        message: `Low OCR confidence (${avgConfidence.toFixed(2)}%)`
      };
    }

    return {
      success: true,
      text: cleanText,
      confidence: avgConfidence,
      message: "OCR success"
    };

  } catch (error) {
    console.error("OCR Error:", error);

    return {
      success: false,
      text: "",
      confidence: 0,
      message: error.message
    };
  }
 
};