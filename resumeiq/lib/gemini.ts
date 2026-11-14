import "server-only";
import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Copy the exact IDs from AI Studio. These are guesses from the display names.
export const MODELS = [
  "gemini-3.5-flash-lite", // 500/day
  "gemini-3.1-flash-lite", // 500/day, separate quota
  "gemini-4-hydrogen", // 20/day, last resort
];

function isRateLimit(err: unknown) {
  const e = err as { status?: number; message?: string };
  return (
    e?.status === 429 ||
    String(e?.message ?? err).includes("429") ||
    String(e?.message ?? err).includes("RESOURCE_EXHAUSTED")
  );
}

export async function withModelFallback<T>(
  run: (model: string) => Promise<T>,
): Promise<T> {
  let lastError: unknown;

  for (const model of MODELS) {
    try {
      return await run(model);
    } catch (err) {
      if (!isRateLimit(err)) throw err; // bad file, wrong model ID, etc.: fail now
      console.warn(`${model} rate limited, trying next model`);
      lastError = err;
    }
  }

  throw lastError; // every model is exhausted
}
