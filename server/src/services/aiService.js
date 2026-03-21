import axios from "axios";

export const askLLM = async (prompt) => {
  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "mistral",
    prompt,
    stream: false
  });

  return res.data.response;
};