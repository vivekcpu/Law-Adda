import { askQuestion } from "../services/ragService.js";

export const askAI = async (req, res) => {
  try {
    const { prompt, docId } = req.body;

    // Validate input
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "docId is required",
      });
    }

    //  Pass docId to RAG
    const result = await askQuestion(prompt, docId);

    res.json({
      success: true,
      answer: result.answer,
      sources: result.sources,
    });

  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};