import CopyButton from "../common/CopyButton";

type ImprovementProps = {
  title: string;
  before: string;
  after: string;
  reason: string;
};

const ImprovementCard = ({
  title,
  before,
  after,
  reason,
}: ImprovementProps) => {
  return (
    <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3 sm:gap-4 bg-white rounded-lg border-[1.5px] border-border">
      <div className="flex justify-between items-center">
        <span className="inline-block rounded-sm bg-background px-2 py-0.5 sm:px-2.5 sm:py-1 font-semibold text-[11px] sm:text-xs tracking-wide">
          {title}
        </span>
        <CopyButton
          text="Copy"
          text2="improved"
          className="font-semibold text-xs sm:text-[11px] lg:text-xs text-primary sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 sm:rounded-sm sm:border-[1.5px] lg:hover:bg-background"
          iconClass="pl-1 size-3.5 stroke-3 inline-block"
          textAfter="Copied"
          copyItem={after}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="p-2.5 sm:p-3 lg:p-4 flex-1 bg-background rounded-md">
          <h5 className="font-bold text-score-red text-[11px] lg:text-xs mb-1 sm:mb-1.5 lg:mb-2 uppercase">
            Before
          </h5>
          <p className="text-dark-gray text-[13px] lg:text-sm">{before}</p>
        </div>
        <div className="p-2.5 sm:p-3 lg:p-4 flex-1 bg-[#D1FAE5] rounded-md">
          <h5 className="font-bold text-primary text-[11px] lg:text-xs mb-1 sm:mb-1.5 lg:mb-2 uppercase">
            After (AI Rewrite)
          </h5>
          <p className="text-black text-[13px] lg:text-sm font-medium">
            {after}
          </p>
        </div>
      </div>
      <div className="flex gap-1.5 sm:gap-1 lg:gap-2 items-start">
        <h6 className="font-semibold tracking-wide text-xs lg:text-[13px] text-nowrap">
          Why it's better:
        </h6>
        <p className="text-xs lg:text-[13px] text-dark-gray">{reason}</p>
      </div>
    </div>
  );
};

export default ImprovementCard;
