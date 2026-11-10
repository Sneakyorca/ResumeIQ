import { ScoreRing } from "@/components/common/ScoreRing";
import { reportCount, reports } from "@/data/data";
import { FileX } from "lucide-react";
import Link from "next/link";

const ReportDashboard = () => {
  return (
    <section className="p-4 sm:p-10 lg:px-12 lg:py-20 w-full flex justify-center bg-background font-inter">
      <main className="max-w-250 w-full">
        <div className="flex justify-between items-center mb-5 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-0.5 sm:gap-1 lg:gap-1.5">
            <h1 className="font-extrabold text-[20px] sm:text-[24px] lg:text-[32px]">
              Your reports
            </h1>
            <p className="text-xs sm:text-[13px] lg:text-sm text-dark-gray">
              {reports.length} reports analyzed recently
            </p>
          </div>
          <Link
            href="/analyze"
            className="rounded-md px-3 py-2 sm:px-4 lg:py-2.5 lg:px-5 inline-block bg-primary text-white font-semibold tracking-wide text-xs sm:text-[13px] lg:text-sm hover:bg-primary/80"
          >
            New analysis
          </Link>
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-4">
          {reports.length ? <InfoCard /> : <EmptyCard />}
        </div>
      </main>
    </section>
  );
};

export default ReportDashboard;

const InfoCard = () => {
  return (
    <>
      {reports.map((report) => (
        <div
          key={report.id}
          className="rounded-lg flex p-3.5 gap-3 sm:p-4 sm:gap-4 lg:gap-6 lg:p-5 border-[1.5px] border-border items-center bg-white"
        >
          <ScoreRing score={report.score} size="medium" />
          <div className="flex flex-col gap-0.5 md:gap-1 items-start flex-1">
            <h3 className="font-semibold text-[13px] sm:text-sm lg:text-[16px] ">
              {report.fileName}
            </h3>
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 text-[11px] sm:text-[12px] lg:text-[13px]">
              <p className="text-dark-gray">{report.jobTitle}</p>
              <p className="text-light-gray bg-light-gray rounded-full size-0.5" />
              <p className="text-light-gray">{report.relativeDate}</p>
            </div>
          </div>
          <Link
            href={`/reports/${report.id}`}
            className="px-2.5 py-1.5 sm:px-3 lg:px-4 lg:py-2 border-[1.5px] border-border rounded-sm font-semibold text-[11px] lg:text-[13px] inline-block self-center justify-self-end hover:bg-background"
          >
            View <span className="hidden lg:inline">report</span>
          </Link>
        </div>
      ))}
    </>
  );
};

const EmptyCard = () => {
  return (
    <>
      <div className="px-6 py-12 sm:p-16 flex flex-col gap-4 sm:gap-5 lg:gap-6 items-center bg-white border-[1.5px] border-border rounded-lg">
        <div className="size-10 sm:size-12">
          <FileX className="w-6.5 h-8 sm:w-7.5 sm:h-9 lg:w-8 lg:h-10 text-light-gray" />
        </div>
        <div className="flex flex-col gap-1 sm:gap-1.5 items-center">
          <h3 className="font-semibold text-[16px] lg:text-lg">
            No reports yet
          </h3>
          <p className="text-[13px] lg:text-sm text-dark-gray">
            Analyze your first resume to see metrics-driven feedback and score
            cards.
          </p>
        </div>{" "}
        <Link
          href="/analyze"
          className="rounded-md px-4 py-2 sm:px-5 lg:py-2.5 lg:px-6 inline-block bg-primary text-white font-semibold tracking-wide text-xs text-[13px] lg:text-sm hover:bg-primary/80"
        >
          Upload your first resume
        </Link>
      </div>
    </>
  );
};
