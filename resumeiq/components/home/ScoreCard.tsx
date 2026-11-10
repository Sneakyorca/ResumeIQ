"use client";

import { Separator } from "@/components/ui/separator";

import useMediaQuery from "@/hooks/MediaQuery";
import { ScoreRing } from "../common/ScoreRing";

type ScoreCardProps = {
  score?: number;
};

export function ScoreCard({ score = 68 }: ScoreCardProps) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const isDesktop = useMediaQuery("(min-width:768px)");

  return (
    <div className="w-full max-w-[640px] mx-auto p-1 gap-1 md:p-2 md:gap-2 overflow-hidden rounded-xl border-2 border-border bg-background mb-8 sm:mb-16 lg:mb-20">
      <div className="flex min-h-[102px] flex-col gap-3 px-2 py-2 md:flex-row md:items-center md:gap-6 md:px-5 md:py-4">
        <div className="flex items-center gap-4">
          {/* Score */}
          <ScoreRing score={score} size="large" />

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
