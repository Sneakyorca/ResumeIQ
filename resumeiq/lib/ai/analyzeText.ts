import { ai, MODEL } from "@/lib/gemini";
import * as z from "zod";

const Section = z.object({
  title: z.string(),
  score: z.number().describe("Integer from 0 to 100"),
  feedBack: z.string(),
});

const Review = z.object({
  title: z.string(),
  before: z.string(),
  after: z.string(),
  reason: z.string(),
});

export const AnalysisSchema = z.object({
  overallScore: z.number().describe("Integer from 0 to 100"),
  jobTitle: z.string(),
  feedBack: z.string(),
  overview: z.string(),
  assessment: z.object({
    impact: Section,
    clarity: Section,
    atsFriendliness: Section,
    formatting: Section,
  }),
  lineByLineReview: z.object({
    impact: Review,
    clarity: Review,
    atsFriendliness: Review,
  }),
});

export type Analysis = z.infer<typeof AnalysisSchema>;
export type Report = Analysis & {
  fileName: string;
  createdAt: number; // timestamp, this is what gets stored
};

export type ReportView = Report & {
  relativeDate: string; // computed on read, never stored
};

export async function analyzeResume(resumeText: string): Promise<Analysis> {
  const interaction = await ai.interactions.create({
    model: MODEL,
    input: `You are a resume reviewer. Analyze the resume below and score each category from 0 to 100. For lineByLineReview, quote a real weak line from the resume as "before" and rewrite it as "after".\n\nRESUME:\n${resumeText}`,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(AnalysisSchema),
    },
  });

  return AnalysisSchema.parse(JSON.parse(interaction.output_text));
}
