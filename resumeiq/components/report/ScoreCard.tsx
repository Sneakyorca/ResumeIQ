import { ScoreRing } from "../common/ScoreRing";
import { Separator } from "../ui/separator";
type ScoreCard = {
  score: number;
  fileName: string;
  overview: string;
  relativeDate: string;
};
const ScoreCard = ({ score, fileName, overview, relativeDate }: ScoreCard) => {
  return (
    <>
      <div className="border-[1.5px] rounded-xl border-border p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 lg:gap-8 bg-white sm:hidden">
        <div className="flex gap-3 items-center">
          <ScoreRing score={score} size="xl" />
          <div className="flex flex-col items-start gap-0.5">
            <h4 className="font-extrabold text-[18px]">
              Good, with room to improve
            </h4>
            <p className="text-xs text-dark-gray">{fileName}</p>
          </div>
        </div>
        <p className="text-dark-gray text-[13px] leading-[22px]">{overview}</p>
        <div className="gap-2 flex">
          <button className="px-3 py-1.5 rounded-md border-[1.5px] border-border font-semibold text-[11px] flex-1">
            Copy report
          </button>
          <button className="px-3 py-1.5 rounded-md border-[1.5px] border-border font-semibold text-white bg-black text-[11px] flex-1">
            Export PDF
          </button>
        </div>
      </div>
      <div className="border-[1.5px] rounded-xl border-border p-4 sm:p-6 lg:p-8 hidden sm:flex gap-4 sm:gap-6 lg:gap-8 bg-white items-center">
        <ScoreRing score={score} size="xl" />
        <div className="flex flex-col gap-2 lg:gap-3 flex-1">
          <div className="flex justify-between items-center flex-1">
            <div className="flex flex-col items-start gap-0.5">
              <h4 className="font-extrabold text-[18px] sm:text-[20px] lg:text-[24px]">
                Good, with room to improve
              </h4>
              <div className="flex items-center gap-1 sm:gap-1 lg:gap-2 text-xs sm:text-[13px] lg:text-sm text-dark-gray">
                <p>{fileName}</p>
                <p className="text-light-gray bg-light-gray rounded-full size-0.5" />
                <p>{relativeDate}</p>
              </div>
            </div>
            <div className="gap-2 lg:gap-3 flex">
              <button className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-md border-[1.5px] border-border font-semibold text-[11px] sm:text-xs lg:text-[13px] flex-1 text-nowrap">
                Copy report
              </button>
              <button className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-md border-[1.5px] border-border font-semibold text-white bg-black text-[11px] sm:text-xs lg:text-[13px] flex-1 text-nowrap">
                Export PDF
              </button>
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
