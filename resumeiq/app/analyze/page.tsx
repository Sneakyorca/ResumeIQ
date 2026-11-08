"use client";
import { Separator } from "@/components/ui/separator";
import { CloudUpload } from "lucide-react";
import { useResumeForm, FAKE_PARSE_MS } from "@/data/dataClient";
import { AnalyzeButton, TextArea } from "@/components/common/Analyze";
import type { DragEvent, ChangeEvent, RefObject } from "react";

const Analyze = () => {
  const {
    register,
    fileName,
    fileInputRef,
    handleSample,
    handleFileChange,
    isDragging,
    isParsing,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isSubmitting,
    onSubmit,
    handleSubmit,
  } = useResumeForm();

  return (
    <main className="max-w-160 m-4 sm:m-20 sm:mt-12 lg:mt-16 lg:mx-80 lg:mb-25 font-inter flex flex-col justify-center gap-5 sm:gap-8 lg:gap-10 items-center">
      <div className="self-start">
        <h1 className="font-extrabold text-2xl lg:text-[32px] mb-1 sm:mb-2">
          Analyze a resume
        </h1>
        <p className="text-[13px] sm:text-sm text-dark-gray">
          Paste your text below or drop your resume file for an instant report.
        </p>
      </div>
      <FileSelect
        fileName={fileName}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        isDragging={isDragging}
        isParsing={isParsing}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
      />
      <div className="flex items-center gap-3 w-full">
        <Separator className="flex-1 w-auto" />
        <p className="font-medium text-xs text-nowrap text-light-gray">
          OR PASTE RAW TEXT
        </p>
        <Separator className="flex-1 w-auto" />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center"
      >
        <ul className="flex justify-between mb-2 sm:mb-2.5 ">
          <li className="font-semibold text-[13px] sm:text-sm">Resume text</li>{" "}
          <li className="font-semibold text-[12px] sm:text-[13px]">
            <button
              className="underline cursor-pointer text-dark-gray"
              type="button"
              onClick={handleSample}
            >
              Try a sample
            </button>
          </li>
        </ul>
        <TextArea
          register={register}
          isDragging={isDragging}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          isParsing={isParsing}
          className={`placeholder:text-light-gray  mb-5 sm:mb-8 lg:mb-10 resize-none text-black font-inter rounded-lg p-3.5 text-[14px] w-full h-40 sm:h-45 md:h-60 md:p-5 lg:text-[15px] border outline-light-gray ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border bg-white"
          }`}
        />
        <AnalyzeButton
          isSubmitting={isSubmitting}
          className="items-center self-center"
        />
      </form>{" "}
    </main>
  );
};

export default Analyze;

type FileSelectProps = {
  fileName: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDragging: boolean;
  isParsing: boolean;
  handleDragOver: (e: DragEvent) => void;
  handleDragLeave: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
};

const FileSelect = ({
  fileName,
  fileInputRef,
  handleFileChange,
  isDragging,
  isParsing,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}: FileSelectProps) => {
  const dashedBorder = (color: string) =>
    `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='${color}' stroke-width='4' stroke-dasharray='14%2c 10' stroke-linecap='square'/%3e%3c/svg%3e")`;

  return (
    <div
      className={`w-full flex flex-col items-center gap-3 p-6 sm:p-10 rounded-lg cursor-pointer ${
        isDragging ? "bg-primary/5" : "bg-background"
      } ${isParsing ? "pointer-events-none" : ""}`}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        backgroundImage: dashedBorder(isDragging ? "%236366f1" : "%23e5e7eb"),
      }}
    >
      <CloudUpload className="size-6 lg:size-8" />
      <div className="text-center">
        <p className="text-sm lg:text-[15px] font-semibold mb-0.5 sm:mb-1">
          Drag & drop your resume here
        </p>
        <p className="text-xs lg:text-[13px] text-light-gray">
          Supports PDF and DOCX
        </p>
      </div>
      {isParsing ? (
        <div className="w-full max-w-xs">
          <p className="mb-2 text-center text-xs text-dark-gray truncate">
            Reading {fileName}…
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: "100%",
                animation: `fill ${FAKE_PARSE_MS}ms linear forwards`,
              }}
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="text-[13px] sm:text-sm text-primary underline bg-transparent"
        >
          Browse files
        </button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.docx"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
};
