import { reports } from "@/data/data";
import type { Report, ReportView } from "@/lib/ai/analyzeText";
import { timeAgo } from "@/lib/timeAgo";

export async function saveReport(report: Report): Promise<void> {
  reports.push(report); // TEMP: replace with a Supabase insert later
}

export async function getReports(): Promise<ReportView[]> {
  const now = Date.now();
  return [...reports]
    .sort((a, b) => b.createdAt - a.createdAt)
    .map((r) => ({ ...r, relativeDate: timeAgo(r.createdAt, now) }));
}
export async function getReport(id: string): Promise<ReportView | null> {
  const r = reports.find((r) => String(r.createdAt) === id);
  return r ? { ...r, relativeDate: timeAgo(r.createdAt) } : null;
}
// import { supabase } from "@/lib/supabase";

// export async function saveReport(report: Report) {
//   const { error } = await supabase.from("reports").insert({
//     file_name: report.fileName,
//     created_at: new Date(report.createdAt).toISOString(),
//     data: report, // store the whole analysis as a jsonb column
//   });
//   if (error) throw error;
// }
