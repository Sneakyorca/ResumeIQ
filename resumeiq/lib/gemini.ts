import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// export const MODEL = "gemini-3.6-flash"; // change the model in one place
export const MODEL = "gemini-3.5-flash-lite"; // example ID, copy the exact one from AI Studio
