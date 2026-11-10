import type { DragEvent, ChangeEvent, RefObject } from "react";

import { CloudUpload } from "lucide-react";
import { FAKE_PARSE_MS } from "@/data/dataClient";
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

export const FileSelect = ({
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
