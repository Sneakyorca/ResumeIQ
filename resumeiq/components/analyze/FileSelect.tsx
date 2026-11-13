"use client";

import { useEffect, useState } from "react";
import type { DragEvent, ChangeEvent, RefObject } from "react";
import { CircleCheck, CloudUpload, TriangleAlert } from "lucide-react";

type FileSelectProps = {
  fileName: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isDragging: boolean;
  isParsing: boolean;
  error?: string;
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
  error,
  handleDragOver,
  handleDragLeave,
  handleDrop,
}: FileSelectProps) => {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    if (!isParsing) {
      setSlow(false);
      return;
    }
    const t = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(t);
  }, [isParsing]);

  const dashedBorder = (color: string) =>
    `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='${color}' stroke-width='4' stroke-dasharray='14%2c 10' stroke-linecap='square'/%3e%3c/svg%3e")`;

  const borderColor = error
    ? "%23ef4444"
    : isDragging
      ? "%236366f1"
      : "%23e5e7eb";

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className={`w-full flex flex-col items-center gap-3 p-6 sm:p-10 rounded-lg cursor-pointer ${
          isDragging ? "bg-primary/5" : "bg-background"
        } ${isParsing ? "pointer-events-none" : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ backgroundImage: dashedBorder(borderColor) }}
      >
        <CloudUpload className="size-6 lg:size-8" />
        <div className="text-center">
          <p className="text-sm lg:text-[15px] font-semibold mb-0.5 sm:mb-1">
            Drag & drop your resume here
          </p>
          <p className="text-xs lg:text-[13px] text-light-gray">
            Supports PDF and DOCX, up to 10 MB
          </p>
        </div>

        {isParsing ? (
          <div className="w-full max-w-xs" role="status" aria-live="polite">
            <p className="mb-2 text-center text-xs text-dark-gray truncate">
              Reading {fileName}…
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-1/3 rounded-full bg-primary animate-[indeterminate_1.2s_ease-in-out_infinite]" />
            </div>
            {slow && (
              <p className="mt-2 text-center text-xs text-light-gray">
                Still working. Scanned files take a little longer.
              </p>
            )}
          </div>
        ) : fileName && !error ? (
          <p className="flex items-center gap-1.5 text-[13px] text-dark-gray">
            <CircleCheck className="size-4 text-green-600" />
            <span className="truncate max-w-56">{fileName}</span>
            <span className="text-primary underline">Replace</span>
          </p>
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

      {error && (
        <p
          role="alert"
          className="flex items-start gap-1.5 text-[13px] text-red-500"
        >
          <TriangleAlert className="size-4 shrink-0 mt-px" />
          {error}
        </p>
      )}
    </div>
  );
};
