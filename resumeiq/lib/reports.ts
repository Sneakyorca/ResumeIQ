import "server-only";
import type { Report, ReportView } from "@/lib/ai/analyzeText";
import { timeAgo } from "@/lib/timeAgo";
import { createClient } from "@/utils/supabase/server";

type Row = {
  id: string;
  file_name: string;
  job_title: string;
  overall_score: number;
  feedback: string;
  overview: string;
  category_scores: ReportView["assessment"];
  rewrites: ReportView["lineByLineReview"];
  created_at: string;
};

function toView(row: Row, now = Date.now()): ReportView {
  const createdAt = new Date(row.created_at).getTime();
  return {
    id: row.id,
    fileName: row.file_name,
    jobTitle: row.job_title,
    overallScore: row.overall_score,
    feedBack: row.feedback,
    overview: row.overview,
    assessment: row.category_scores,
    lineByLineReview: row.rewrites,
    createdAt,
    relativeDate: timeAgo(createdAt, now),
  };
}

export async function saveReport(report: Report) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");
  const { data, error } = await supabase
    .from("reports")
    .insert({
      user_id: user.id,
      file_name: report.fileName,
      job_title: report.jobTitle,
      overall_score: report.overallScore,
      feedback: report.feedBack,
      overview: report.overview,
      category_scores: report.assessment,
      rewrites: report.lineByLineReview,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function getReports(): Promise<ReportView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  const now = Date.now();
  return (data as Row[]).map((row) => toView(row, now));
}

export async function getReport(id: string): Promise<ReportView | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  console.log("getReport", { id, found: !!data, error: error?.message });

  if (error) return null;
  return data ? toView(data as Row) : null;
}
