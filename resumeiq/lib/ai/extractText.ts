import { createPartFromUri, createUserContent } from "@google/genai";
import { ai, MODEL } from "@/lib/gemini";

export async function extractTextWithGemini(pdf: Uint8Array): Promise<string> {
  const uploaded = await ai.files.upload({
    file: new Blob([new Uint8Array(pdf)], { type: "application/pdf" }),
    config: { mimeType: "application/pdf" },
  });

  try {
    const res = await ai.models.generateContent({
      model: MODEL,
      contents: createUserContent([
        createPartFromUri(uploaded.uri!, uploaded.mimeType!),
        "Transcribe all text from this resume exactly as written. Keep the reading order. Output only the text, with no commentary.",
      ]),
    });
    return res.text?.trim() ?? "";
  } finally {
    // clean up the uploaded copy
    if (uploaded.name)
      await ai.files.delete({ name: uploaded.name }).catch(() => {});
  }
}
