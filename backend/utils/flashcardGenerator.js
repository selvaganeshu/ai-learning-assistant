import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("Fatal Error: GEMINI_API_KEY is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Extract valid JSON from Gemini output
 */
const extractJSON = (text) => {
  if (!text) throw new Error("Empty Gemini response");
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\[[\s\S]*\]/);

  if (!match) {
    throw new Error("No JSON array found in Gemini output");
  }

  return JSON.parse(match[0]);
};

/**
 * Generate flashcards from text
 */
export const generateFlashcardsFromText = async (text, count = 5) => {
  const prompt = `
You are an AI tutor.

Generate exactly ${count} educational flashcards from the text below.

Return ONLY valid JSON.
Do NOT use markdown, backticks, or explanations.

Format:

[
  {
    "question": "clear and specific question",
    "answer": "concise and accurate answer",
    "difficulty": "easy | medium | hard"
  }
]

TEXT:
${text.substring(0, 15000)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const rawText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    return extractJSON(rawText);
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw new Error("Failed to generate flashcards");
  }
};