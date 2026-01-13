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

//Extract valid json from gemini output

const extractJSON = (text) => {
  if (!text) throw new Error("Empty gemini response");

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

export const generateQuizzesFromFlashcards = async (flashcards, count = 5) => {
  const prompt = `
    You are an AI tutor.
    Generate exactly ${count} multiple-choice quiz questions
    from the flashcards below.

    Rules : 
    - Each quiz must have exactly 4 options
    - Only ONE option must be correct
    - The correct answer must be EXACTLY one of the options
    - Do NOT include explanations
    - Return ONLY valid JSON
    - Do NOT use markdown or backticks

    Format : 

    [
    {
        "question" : "quiz question",
        "options" :  ["option A", "option B", "option C", "option D"],
        "correctAnswer" : "option A"
    }]

    FLASHCARDS : 

    ${flashcards.map((f,i)=> `${i+1}. Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n")}
    `;

    try{
        const response = await ai.models.generateContent({
            model : "gemini-2.5-flash-lite",
            contents : [
                {
                    role : "user",
                    parts : [{text : prompt}]
                }
            ]
        })
        const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

        return extractJSON(rawText);
    }catch(error){
        console.error(`Gemini Quiz API Error : ${error.message}`);
        throw new message("Failed to Generate Quizz");
    }
};
