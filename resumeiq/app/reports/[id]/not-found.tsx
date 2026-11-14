import Link from "next/link";
import { FileX } from "lucide-react";

export default function ReportNotFound() {
  return (
    <section className="flex flex-1 min-h-[60vh] w-full items-center justify-center bg-background p-4 sm:p-10 font-inter">
      <div className="flex w-full max-w-md flex-col items-center gap-4 sm:gap-5 rounded-lg border-[1.5px] border-border bg-white px-6 py-12 sm:p-14 text-center">
        <FileX className="size-8 sm:size-10 text-light-gray" />
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <h1 className="text-[18px] sm:text-xl font-extrabold">
            Report not found
          </h1>
          <p className="text-[13px] lg:text-sm text-dark-gray">
            This report may have been deleted, or the link is wrong. Reports are
            only visible to the account that created them.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Link
            href="/reports"
            className="rounded-md px-4 py-2 sm:px-5 bg-primary text-white font-semibold tracking-wide text-[13px] lg:text-sm hover:bg-primary/80"
          >
            Back to reports
          </Link>
          <Link
            href="/analyze"
            className="rounded-md px-4 py-2 sm:px-5 border-[1.5px] border-border font-semibold tracking-wide text-[13px] lg:text-sm hover:bg-background"
          >
            Analyze a resume
          </Link>
        </div>
      </div>
    </section>
  );
}
