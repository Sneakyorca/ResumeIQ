import { PDFParse } from "pdf-parse";
import { extractTextWithGemini } from "@/lib/ai/extractText";

const MIN_CHARS = 50;

function cleanText(text: string) {
  return text
    .replace(/^-- \d+ of \d+ --$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(request: Request) {
  const buffer = Buffer.from(await request.arrayBuffer());

  if (buffer.byteLength === 0) {
    return Response.json({ error: "Empty file." }, { status: 400 });
  }

  const parser = new PDFParse({ data: new Uint8Array(buffer) });

  try {
    let text = cleanText((await parser.getText()).text);

    if (text.length < MIN_CHARS) {
      console.log("Falling back to Gemini");
      try {
        text = cleanText(await extractTextWithGemini(new Uint8Array(buffer)));
      } catch (err) {
        console.error("Gemini failed:", err);
        return Response.json(
          {
            error:
              "Couldn't read this scanned file right now. Try again in a minute.",
          },
          { status: 503 },
        );
      }
    }

    if (text.length < MIN_CHARS) {
      return Response.json(
        { error: "No readable text found in this PDF." },
        { status: 422 },
      );
    }

    return Response.json({ text });
  } catch (err) {
    console.error("PDF parse failed:", err);
    return Response.json(
      {
        error:
          "Couldn't read this PDF. It may be corrupt or password-protected.",
      },
      { status: 422 },
    );
  } finally {
    await parser.destroy();
  }
}
