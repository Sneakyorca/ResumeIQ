"use client";
import { useEffect, useRef, useState } from "react";

type Report = {
  overallScore: number;
  fileName: string;
  jobTitle: string;
  relativeDate: string;
  feedBack: string;
  overview: string;
  assessment: Record<
    string,
    { title: string; score: number; feedBack: string }
  >;
  lineByLineReview: Record<
    string,
    {
      title: string;
      before: string;
      after: string;
      reason: string;
    }
  >;
};
type ExportButtonProps = {
  report: Report;
};

const escapeHTML = (value: string) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char]!,
  );

const clamp = (n: number) => Math.max(0, Math.min(100, Number(n) || 0));

const scoreColor = (score: number) =>
  score >= 75 ? "#16a34a" : score >= 50 ? "#f59e0b" : "#ef4444";

// A4 (210mm) minus 16mm margins each side = 178mm ≈ 672px at 96dpi.
// Matching this width means nothing gets rescaled, so fonts stay true to size.
const PAGE_WIDTH_PX = 672;

const styles = `
  .rq-root, .rq-root * { box-sizing: border-box; }
  .rq-root {
    width: ${PAGE_WIDTH_PX}px;
    background: #ffffff;
    color: #111827;
    font-size: 13px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  .rq-root p { margin: 6px 0 0; color: #374151; overflow-wrap: anywhere; }
  .rq-root h1, .rq-root h2, .rq-root h3 { font-weight: 700; color: #111827; margin: 0; }
  .rq-root strong { font-weight: 700; }

  .rq-header { border-bottom: 2px solid #e5e7eb; padding-bottom: 18px; margin-bottom: 24px; }
  .rq-brand { color: #16a34a; font-size: 12px; font-weight: 700; letter-spacing: 2px; }
  .rq-root h1 { font-size: 26px; line-height: 1.2; margin: 6px 0 6px; }
  .rq-meta { color: #6b7280; font-size: 12px; }

  .rq-score-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 22px; margin-bottom: 26px; }
  .rq-label { color: #6b7280; font-size: 11px; font-weight: 600; letter-spacing: 1px; }
  .rq-score { font-size: 44px; font-weight: 800; line-height: 1.1; margin: 4px 0 8px; }
  .rq-score-card .rq-feedback { color: #4b5563; font-weight: 600; margin: 0; }

  .rq-root h2 { font-size: 18px; margin: 0 0 14px; }
  .rq-section { margin-bottom: 26px; }

  .rq-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .rq-metric { border: 1px solid #e5e7eb; background: #ffffff; border-radius: 10px; padding: 14px; }
  .rq-metric-header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
  .rq-track { height: 7px; background: #e5e7eb; border-radius: 20px; margin: 10px 0 4px; overflow: hidden; }
  .rq-fill { height: 100%; border-radius: 20px; }

  .rq-review { border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; margin-bottom: 16px; background: #ffffff; }
  .rq-root h3 { font-size: 15px; }
  .rq-box { padding: 11px 12px; border-radius: 8px; margin-top: 10px; }
  .rq-box p { margin: 4px 0 0; }
  .rq-tag { display: block; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
  .rq-before { background: #fef2f2; border: 1px solid #fecaca; }
  .rq-before .rq-tag { color: #dc2626; }
  .rq-after { background: #dcfce7; border: 1px solid #bbf7d0; }
  .rq-after .rq-tag { color: #16a34a; }
  .rq-reason { background: #f3f4f6; }
  .rq-reason .rq-tag { color: #4b5563; }

  .rq-footer { border-top: 1px solid #e5e7eb; padding-top: 14px; margin-top: 30px; text-align: center; font-size: 11px; color: #9ca3af; }
`;

const buildHTML = (report: Report) => {
  const assessmentHTML = Object.values(report.assessment ?? {})
    .map((item) => {
      const s = clamp(item.score);
      return `
        <div class="rq-metric">
          <div class="rq-metric-header">
            <strong>${escapeHTML(item.title)}</strong>
            <strong style="color:${scoreColor(s)}">${s}%</strong>
          </div>
          <div class="rq-track">
            <div class="rq-fill" style="width:${s}%;background:${scoreColor(s)}"></div>
          </div>
          <p>${escapeHTML(item.feedBack)}</p>
        </div>`;
    })
    .join("");

  const reviews = Object.values(report.lineByLineReview ?? {});
  const reviewHTML = reviews
    .map((item, i) => {
      const card = `
        <div class="rq-review">
          <h3>${escapeHTML(item.title)}</h3>
          <div class="rq-box rq-before">
            <span class="rq-tag">BEFORE</span>
            <p>${escapeHTML(item.before)}</p>
          </div>
          <div class="rq-box rq-after">
            <span class="rq-tag">AFTER</span>
            <p>${escapeHTML(item.after)}</p>
          </div>
          <div class="rq-box rq-reason">
            <span class="rq-tag">WHY THIS IS BETTER</span>
            <p>${escapeHTML(item.reason)}</p>
          </div>
        </div>`;
      // Keep the heading glued to the first card so it never sits alone at a page bottom
      return i === 0
        ? `<div class="rq-keep"><h2>Line-by-Line Review</h2>${card}</div>`
        : card;
    })
    .join("");

  const s = clamp(report.overallScore);

  return `
    <style>${styles}</style>

    <div class="rq-header">
      <div class="rq-brand">RESUMEIQ</div>
      <h1>Resume Analysis Report</h1>
      <div class="rq-meta">
        ${escapeHTML(report.fileName)} · ${escapeHTML(report.jobTitle)} · ${escapeHTML(report.relativeDate)}
      </div>
    </div>

    <div class="rq-score-card">
      <div class="rq-label">OVERALL RESUME SCORE</div>
      <div class="rq-score" style="color:${scoreColor(s)}">${s}%</div>
      <p class="rq-feedback">${escapeHTML(report.feedBack)}</p>
    </div>

    <div class="rq-section rq-keep">
      <h2>Overview</h2>
      <p>${escapeHTML(report.overview)}</p>
    </div>

    <div class="rq-section rq-keep">
      <h2>Assessment Breakdown</h2>
      <div class="rq-metrics">${assessmentHTML}</div>
    </div>

    <div class="rq-section">${reviewHTML}</div>

    <div class="rq-footer">Generated by ResumeIQ</div>
  `;
};

const exportReport = async (report: Report) => {
  const html2pdf = (await import("html2pdf.js")).default;

  // Off-screen, but still rendered (not display:none)
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "position:fixed;left:-10000px;top:0;pointer-events:none;";

  const root = document.createElement("div");
  root.className = "rq-root";
  // Use whatever font the app is already rendering (Inter/Geist via next/font)
  root.style.fontFamily = getComputedStyle(document.body).fontFamily;
  root.innerHTML = buildHTML(report);

  wrapper.appendChild(root);
  document.body.appendChild(wrapper);

  // Make sure the web font is loaded before the snapshot is taken
  try {
    await document.fonts.load("400 13px " + root.style.fontFamily);
    await document.fonts.load("700 13px " + root.style.fontFamily);
    await document.fonts.ready;
  } catch {}
  await new Promise((r) => requestAnimationFrame(() => r(null)));

  const baseName = report.fileName.replace(/\.[^/.]+$/, "") || "report";
  const safeName = baseName.replace(/[^a-z0-9-_]+/gi, "-");

  try {
    await html2pdf()
      .set({
        margin: [16, 16, 16, 16],
        filename: `ResumeIQ-Report-${safeName}.pdf`,
        image: { type: "png" },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0, // stops blank space at the top when the page is scrolled
          windowWidth: PAGE_WIDTH_PX,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: {
          mode: ["css", "legacy"],
          avoid: [
            ".rq-keep",
            ".rq-review",
            ".rq-metric",
            ".rq-score-card",
            ".rq-footer",
          ],
        },
      })
      .from(root)
      .save();
  } finally {
    document.body.removeChild(wrapper);
  }
};

type Status = "idle" | "loading" | "done";

const ExportButton = ({ report }: ExportButtonProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = async () => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      await exportReport(report);
      setStatus("done");
      timeoutRef.current = setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      console.error(err);
      setStatus("idle");
      alert("Could not export the report. Please try again.");
    }
  };

  const isDone = status === "done";

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-md border-[1.5px] font-semibold text-white text-[11px] sm:text-xs lg:text-[13px] flex-1 text-nowrap cursor-pointer transition-colors duration-300 flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed ${
        isDone
          ? "bg-primary border-primary hover:bg-primary"
          : "bg-black border-border hover:bg-black/90"
      }`}
    >
      {status === "loading" && (
        <svg
          className="h-3.5 w-3.5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-25"
          />
          <path
            d="M22 12a10 10 0 0 0-10-10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
      {isDone && (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
      {status === "loading"
        ? "Exporting..."
        : isDone
          ? "Exported"
          : "Export PDF"}
    </button>
  );
};

export default ExportButton;
