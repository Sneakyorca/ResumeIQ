import "server-only";
import { ai, withModelFallback } from "@/lib/gemini";
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
  feedBack: z
    .string()
    .describe(
      "One sentence, under 10 words, summarizing the resume's main strength and biggest weakness",
    ),
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
export type Report = Analysis & { fileName: string };

export type ReportView = Report & {
  id: string;
  createdAt: number;
  relativeDate: string;
};

export async function analyzeResume(resumeText: string): Promise<Analysis> {
  const output = await withModelFallback(async (model) => {
    const interaction = await ai.interactions.create({
      model,
      input: `You are a resume reviewer. Analyze the resume below and score each category from 0 to 100. For lineByLineReview, quote a real weak line from the resume as "before" and rewrite it as "after". - feedBack must be a single sentence of at most 10 words.
\n\nRESUME:\n${resumeText}`,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: z.toJSONSchema(AnalysisSchema),
      },
    });
    const text = interaction.output_text;
    if (!text) throw new Error("Empty response from model");
    return text;
  });

  return AnalysisSchema.parse(JSON.parse(output));
}
