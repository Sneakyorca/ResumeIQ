import { analyzeResume, type Report } from "@/lib/ai/analyzeText";
import { saveReport } from "@/lib/reports";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ message: "Please sign in." }, { status: 401 });
  }

  try {
    const { resume, fileName } = await request.json();

    if (!resume || typeof resume !== "string") {
      return Response.json({ message: "Invalid resume data" }, { status: 400 });
    }

    const analysis = await analyzeResume(resume);
    const now = Date.now();

    const report: Report = {
      ...analysis,
      fileName:
        typeof fileName === "string" && fileName ? fileName : "Pasted resume",
    };
    const id = await saveReport(report);
    return Response.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    const busy = String(error).includes("429");
    return Response.json(
      {
        message: busy
          ? "The AI is busy right now. Try again in a minute."
          : "Error analyzing resume",
      },
      { status: busy ? 429 : 500 },
    );
  }
}
