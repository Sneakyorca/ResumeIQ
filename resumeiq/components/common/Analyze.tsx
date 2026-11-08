"use client";

import { DragEvent } from "react";
import { UseFormRegister } from "react-hook-form";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "../ui/button";
import type { ResumeFormData } from "@/data/dataClient";

type AnalyzeButtonProps = {
  isSubmitting: boolean;
  className?: string;
};

export const AnalyzeButton = ({
  isSubmitting,
  className = "",
}: AnalyzeButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className={
        "flex items-center justify-center w-full sm:w-51.5 lg:w-54 h-10.5 lg:h-11.75 px-6 sm:px-8 rounded-md text-[15px] lg:text-[16px] font-semibold font-inter text-white tracking-wider disabled:opacity-80" +
        className
      }
    >
      {isSubmitting ? (
        <>
          <DotLottieReact
            src="https://lottie.host/d9090562-960c-45db-ac11-4a50850f6ebb/Bs3aYMiEtD.lottie"
            loop
            autoplay
            style={{ width: 80, height: 80, margin: -24 }}
          />
          <span className="sr-only">Analyzing resume…</span>
        </>
      ) : (
        "Analyze resume"
      )}
    </Button>
  );
};
type TextAreaProps = {
  register: UseFormRegister<ResumeFormData>;
  isDragging: boolean;
  isParsing: boolean;
  handleDragOver: (e: DragEvent) => void;
  handleDragLeave: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  className?: string; // applies to the wrapper, so each page controls the width
};

export const TextArea = ({
  register,
  isDragging,
  isParsing,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  className = "",
}: TextAreaProps) => {
  return (
    <div className={`relative w-full`}>
      <textarea
        {...register("resume", {
          required: "Please paste your resume or upload a file",
        })}
        readOnly={isParsing}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        placeholder="Paste your resume here or drop a file…"
        className={className}
      />

      {isParsing && (
        <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-white/80 backdrop-blur-[1px]">
          <span className="size-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <span className="text-sm font-medium text-dark-gray">
            Reading your resume…
          </span>
        </div>
      )}
    </div>
  );
};
