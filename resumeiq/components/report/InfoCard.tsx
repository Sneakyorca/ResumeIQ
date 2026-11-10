import { Progress } from "@/components/ui/progress";

type InfoCardProps = {
  title: string;
  score: number;
  feedback: string;
};
const InfoCard = ({ title, score, feedback }: InfoCardProps) => {
  return (
    <div className="p-3 flex flex-col gap-2 sm:p-4 sm:gap-3 lg:p-5 lg:gap-4 bg-white border-[1.5px] border-border rounded-lg">
      <div className="flex justify-between">
        <span className="text-[13px] sm:text-[13px] lg:text-[14px] font-semibold">
          {title}
        </span>
        <span
          className={`font-bold text-[14px] sm:text-[15px] lg:text-[16px] ${score <= 50 ? "text-score-red" : score < 70 ? "text-warning" : "text-primary"}`}
        >
          {score}
        </span>
      </div>
      <Progress
        className={`h-1.5! w-full ${score <= 50 ? "[&_[data-slot=progress-indicator]]:bg-score-red" : score < 70 ? "[&_[data-slot=progress-indicator]]:bg-warning" : "[&_[data-slot=progress-indicator]]:bg-primary"}`}
        value={score}
      />
      <p className="text-xs text-dark-gray">{feedback}</p>
    </div>
  );
};

export default InfoCard;
