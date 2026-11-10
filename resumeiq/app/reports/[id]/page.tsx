import InfoCard from "@/components/report/InfoCard";
import ScoreCard from "@/components/report/ScoreCard";
import { reports } from "@/data/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ReportPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const report = reports[parseInt(id) - 1];
  return (
    <>
      <section className="p-4 sm:pt-8 sm:px-10 sm:pb-16 lg:p-20 lg:pt-8 bg-background font-inter">
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
            score={report.score}
            relativeDate={report.relativeDate}
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
        </main>
      </section>
    </>
  );
};

export default ReportPage;
