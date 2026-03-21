import { askQuestion } from "../services/ragService.js";

export const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    const answer = await askQuestion(question);

    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};