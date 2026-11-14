import { PDFParse } from "pdf-parse";
import { extractTextWithGemini } from "@/lib/ai/extractText";
import mammoth from "mammoth";
import { createClient } from "@/utils/supabase/server";

export const maxDuration = 60;

const MIN_CHARS = 50;

function cleanText(text: string) {
  return text
    .replace(/^-- \d+ of \d+ --$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function detectFileType(buffer: Buffer): "pdf" | "docx" | "unknown" {
  // PDF starts with "%PDF-" (hex: 25 50 44 46 2D)
  if (buffer.subarray(0, 5).toString("ascii") === "%PDF-") {
    return "pdf";
  }

  // DOCX (ZIP archive) starts with "PK\x03\x04" (hex: 50 4B 03 04)
  if (
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04
  ) {
    return "docx";
  }

  return "unknown";
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: "Please sign in." }, { status: 401 });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > 10 * 1024 * 1024) {
    return Response.json(
      { error: "File is too large (max 10 MB)." },
      { status: 413 },
    );
  }

  const buffer = Buffer.from(await request.arrayBuffer());

  if (buffer.byteLength === 0) {
    return Response.json({ error: "Empty file." }, { status: 400 });
  }
  if (buffer.byteLength > 10 * 1024 * 1024) {
    return Response.json(
      { error: "File is too large (max 10 MB)." },
      { status: 413 },
    );
  }
  const fileType = detectFileType(buffer);

  if (fileType === "unknown") {
    return Response.json(
      { error: "Unsupported file type. Please upload a PDF or DOCX." },
      { status: 415 },
    );
  }

  //DOCX handler

  if (fileType === "docx") {
    try {
      const result = await mammoth.extractRawText({ buffer });
      const text = cleanText(result.value);

      if (text.length < MIN_CHARS) {
        return Response.json(
          { error: "No readable text found in this document." },
          { status: 422 },
        );
      }

      return Response.json({ text });
    } catch (err) {
      console.error("DOCX parse failed:", err);
      return Response.json(
        { error: "Couldn't read this Word file. It may be corrupt." },
        { status: 422 },
      );
    }
  }

  // PDF handler

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
