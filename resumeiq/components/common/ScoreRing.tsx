"use client";

import { useEffect, useState } from "react";

type ScoreRingProps = {
  score: number;
  size?: "default" | "large" | "medium" | "xl";
  className?: string;
};

const RADIUS = 20;
const STROKE = 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getRingColor(score: number) {
  if (score > 80) return "text-primary";
  if (score >= 50) return "text-warning";
  return "text-score-red";
}

const SIZES = {
  default: {
    wrapper: "size-10.5 sm:size-12",
    text: "text-[13px] lg:text-[14px]",
  },
  medium: {
    wrapper: "size-12 md:size-15",
    text: "text-[14px] lg:text-[16px]",
  },
  large: {
    wrapper: "size-15 md:size-18",
    text: "text-[16px] md:text-[22px]",
  },
  xl: {
    wrapper: "size-16 md:size-20 lg:size-24",
    text: "text-[20px] md:text-[22px] lg:text-[29px]",
  },
};

export function ScoreRing({
  score,
  size = "default",
  className = "",
}: ScoreRingProps) {
  const safeScore = Math.min(100, Math.max(0, score));
  const [animate, setAnimate] = useState(false);

  // flip after first paint so the ring animates from 0 to the score
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const progress = (safeScore / 100) * CIRCUMFERENCE;
  const offset = animate ? CIRCUMFERENCE - progress : CIRCUMFERENCE;

  return (
    <div
      className={`relative grid shrink-0 place-items-center ${SIZES[size].wrapper} ${className}`}
      role="img"
      aria-label={`Score ${safeScore} out of 100`}
    >
      <svg
        className="absolute inset-0 size-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          className="text-lighter-gray"
        />

        {/* Progress */}
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className={`${getRingColor(safeScore)} transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none`}
        />
      </svg>
      <span
        className={`relative font-inter font-bold leading-none tracking-wide text-black ${SIZES[size].text}`}
      >
        {safeScore}
      </span>
    </div>
  );
}
