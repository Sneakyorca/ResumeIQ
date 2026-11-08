"use client";

import { Separator } from "@/components/ui/separator";

import useMediaQuery from "@/hooks/MediaQuery";

type ScoreCardProps = {
  score?: number;
};

export function ScoreCard({ score = 68 }: ScoreCardProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <div className="w-full max-w-[640px] mx-auto p-1 gap-1 md:p-2 md:gap-2 overflow-hidden rounded-xl border-2 border-border bg-lighter-gray/90 mb-8 sm:mb-16 lg:mb-20">
      <div className="flex min-h-[102px] flex-col gap-3 px-2 py-2 md:flex-row md:items-center md:gap-6 md:px-5 md:py-4">
        <div className="flex items-center gap-4">
          {/* Score */}
          <div className="relative grid size-15 md:size-18 shrink-0 place-items-center">
            <svg
              className="absolute inset-0 size-15 md:size-18 -rotate-90"
              viewBox="0 0 64 64"
              aria-hidden="true"
            >
              {/* Track */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-lighter-gray"
              />

              {/* Progress */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="butt"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                className="text-warning"
              />
            </svg>

            <span className="relative text-card md:text-[22px] font-bold text-black tracking-wider font-inter leading-none">
              {score}
            </span>
          </div>

          {/* Score information */}
          <div className="min-w-0 flex-1 font-inter">
            <p className="text-sm font-bold leading-none text-black mb-1">
              Overall Score
            </p>

            <p className="text-xs text-muted-gray">
              {score}/100 · Needs improvement
            </p>
          </div>
        </div>

        <Separator
          orientation={`${isDesktop ? "vertical" : "horizontal"}`}
          className="md:h-18"
        />

        <div className="min-w-0 flex-1 font-inter">
          <p className="caption mb-2">AI Suggestion</p>

          <p className="mt-1 text-xs text-muted-gray mb-1">
            Before:{" "}
            <span className="text-foreground/80">
              &quot;Responsible for writing clean code.&quot;
            </span>
          </p>

          <p className=" text-[12px] font-semibold  text-primary">
            After: &quot;Shipped 12 modular features reducing code defects by
            18%.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
