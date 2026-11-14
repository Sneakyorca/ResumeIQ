import { ScoreRing } from "../common/ScoreRing";
import { Separator } from "../ui/separator";
import CopyButton from "../common/CopyButton";
import ExportButton from "../common/ExportButton";
import { ReportView } from "@/lib/ai/analyzeText";
type ScoreCard = {
  score: number;
  fileName: string;
  overview: string;
  relativeDate: string;
  report: ReportView;
  feedback: string;
};
const ScoreCard = ({
  score,
  fileName,
  overview,
  relativeDate,
  report,
  feedback,
}: ScoreCard) => {
  return (
    <>
      <div className="border-[1.5px] rounded-xl border-border p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 lg:gap-8 bg-white sm:hidden">
        <div className="flex gap-3 items-center">
          <ScoreRing score={score} size="xl" />
          <div className="flex flex-col items-start gap-0.5">
            <h4 className="font-extrabold text-[18px]">{feedback}</h4>
            <p className="text-xs text-dark-gray">{fileName}</p>
          </div>
        </div>
        <p className="text-dark-gray text-[13px] leading-[22px]">{overview}</p>
        <div className="gap-2 flex">
          <div className="gap-2 flex">
            <CopyButton
              text="Copy"
              text2="full"
              text3="report"
              className="px-3 py-1.5 rounded-md border-[1.5px] border-border font-semibold text-[11px] flex-1 flex items-center justify-center text-nowrap hover:bg-background cursor-pointer"
              iconClass="pl-1 size-3.5 stroke-3"
              textAfter="Report Copied"
              copyItem={report}
            />
            <ExportButton report={report} />
          </div>
        </div>
      </div>
      <div className="border-[1.5px] rounded-xl border-border p-4 sm:p-6 lg:p-8 hidden sm:flex gap-4 sm:gap-6 lg:gap-8 bg-white items-center">
        <ScoreRing score={score} size="xl" />
        <div className="flex flex-col gap-2 lg:gap-3 flex-1">
          <div className="flex justify-between items-center flex-1">
            <div className="flex flex-col items-start gap-0.5">
              <h4 className="font-extrabold text-[18px] sm:text-[20px] lg:text-[24px]">
                {feedback}
              </h4>
              <div className="flex items-center gap-1 sm:gap-1 lg:gap-2 text-xs sm:text-[13px] lg:text-sm text-dark-gray">
                <p>{fileName}</p>
                <p className="text-light-gray bg-light-gray rounded-full size-0.5" />
                <p>{relativeDate}</p>
              </div>
            </div>
            <div className="gap-2 lg:gap-3 flex">
              <CopyButton
                text="Copy"
                text2="full"
                text3="report"
                className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-md border-[1.5px] border-border font-semibold text-[11px] sm:text-xs lg:text-[13px] flex text-nowrap hover:bg-background cursor-pointer"
                iconClass="pl-1 size-4 stroke-3"
                textAfter="Report Copied"
                copyItem={report}
              />
              <ExportButton report={report} />
            </div>{" "}
          </div>
          <Separator />
          <p className="text-dark-gray text-[13px] lg:text-sm leading-[22px]">
            {overview}
          </p>
        </div>
      </div>
    </>
  );
};

export default ScoreCard;
