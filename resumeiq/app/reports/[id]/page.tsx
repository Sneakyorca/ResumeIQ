import InfoCard from "@/components/report/InfoCard";
import ScoreCard from "@/components/report/ScoreCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImprovementCard from "@/components/report/ImprovementCard";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getReport } from "@/lib/reports";

const ReportPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) notFound();
  return (
    <>
      <section className="p-4 sm:pt-8 sm:px-10 sm:pb-16 lg:p-20 lg:pt-8 bg-background font-inter min-h-screen">
        <main className="flex flex-col gap-5 sm:gap-6">
          <div>
            <Link
              href="/reports"
              className="text-[13px] font-medium inline-flex items-center gap-1 lg:gap-2 lg:text-sm text-dark-gray pb-0.5 border-b-2 border-dark-gray hover:text-black hover:border-black group"
            >
              <ArrowLeft className="size-3.25 sm:size-3.5 group-hover:-translate-x-0.5 transition-all duration-100" />{" "}
              Back to reports
            </Link>
          </div>
          <ScoreCard
            fileName={report.fileName}
            overview={report.overview}
            score={report.overallScore}
            relativeDate={report.relativeDate}
            report={report}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {Object.entries(report.assessment).map(([key, assessment]) => (
              <InfoCard
                feedback={assessment.feedBack}
                title={assessment.title}
                score={assessment.score}
                key={key}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            <h2 className="font-extrabold text-[16px] sm:text-[18px] lg:text-[20px]">
              Line-by-line rewrites
            </h2>
            <p className="text-dark-gray text-xs sm:text-[13px] lg:text-sm">
              Copy and paste these optimized bullet points directly into your
              master file.
            </p>
            {Object.entries(report.lineByLineReview).map(([key, review]) => (
              <ImprovementCard
                key={key}
                title={review.title}
                before={review.before}
                after={review.after}
                reason={review.reason}
              />
            ))}
            <div className="flex gap-2 sm:gap-4 lg:gap-6 justify-center items-center underline font-semibold text-[13px] lg:text-sm leading-auto">
              <Link href="/analyze" className="text-primary underline:">
                Analyze another version
              </Link>
              <Separator
                orientation="vertical"
                className="h-3.75 sm:h-4 lg:h-4.25 bg-light-gray"
              />
              <Link href="/reports" className="text-dark-gray">
                Back to reports
              </Link>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ReportPage;
