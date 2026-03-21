import fs from "fs";
import { fileTypeFromBuffer } from "file-type";
import { parsePdf } from "../utils/pdfParser.js";
import { OCR } from "../utils/ocr.js";

export const processDocument = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const type = await fileTypeFromBuffer(buffer);

  console.log("Detected file type:", type);

  if (!type) {
    throw new Error("Cannot detect file type");
  }

  // PDF ONLY
  if (type.mime === "application/pdf") {
    console.log("Processing as PDF");

    try {
      const textFromPdf = await parsePdf(filePath);

      if (textFromPdf && textFromPdf.trim().length > 50) {
        console.log("Using PDF parser");
        return {
          success: true,
          text: textFromPdf
        };
      }

      console.log("PDF has low text → using OCR (PDF mode)");
      return await OCR(filePath, "pdf");

    } catch (error) {
      console.log("PDF parse failed → using OCR (PDF mode)");
      return await OCR(filePath, "pdf");
    }
  }

  // IMAGE ONLY
  if (type.mime.startsWith("image/")) {
    console.log("Processing as IMAGE");
    return await OCR(filePath, "image");
  }

  throw new Error("Unsupported file type");
};