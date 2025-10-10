import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCzZ7FGqG7BVai52G27CSonMXGnFvELYRo",
});

export const GET_AI_DESCRIPTION = async (topic) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: topic,
  });
  return response.text;
};
