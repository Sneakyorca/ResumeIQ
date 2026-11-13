"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { sampleResume } from "@/data/data";
import { useRouter } from "next/navigation";

export type ResumeFormData = {
  resume: string;
};

const RESUME_KEY = "resume-draft";
const FILE_KEY = "resume-file-name";
const MAX_FILE_BYTES = 10 * 1024 * 1024;

export function useResumeForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResumeFormData>();

  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // restore saved draft on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(RESUME_KEY);
      if (saved) setValue("resume", saved);

      const savedName = sessionStorage.getItem(FILE_KEY);
      if (savedName) setFileName(savedName);
    } catch {}
  }, [setValue]);

  // save whenever the resume text changes (typing, sample, parsed file)
  useEffect(() => {
    const sub = watch((value) => {
      try {
        if (value.resume) sessionStorage.setItem(RESUME_KEY, value.resume);
        else sessionStorage.removeItem(RESUME_KEY);
      } catch {}
    });
    return () => sub.unsubscribe();
  }, [watch]);

  function handleSample() {
    setFileError("");
    setFileName("");
    try {
      sessionStorage.removeItem(FILE_KEY);
    } catch {}
    setValue("resume", sampleResume, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }
  async function parseResume(file: File) {
    let response: Response;
    try {
      response = await fetch("/api/parse", { method: "POST", body: file });
    } catch {
      throw new Error("Couldn't reach the server. Check your connection.");
    }

    let result: { text?: string; error?: string } = {};
    try {
      result = await response.json();
    } catch {}

    if (!response.ok || !result.text) {
      throw new Error(
        result.error || "Couldn't read that file. Try another one.",
      );
    }
    return result.text;
  }

  async function processFile(selectedFile: File) {
    if (isParsing) return;
    setFileError("");

    if (!/\.(pdf|docx)$/i.test(selectedFile.name)) {
      setFileError("Please upload a .pdf or .docx file.");
      return;
    }
    if (selectedFile.size > MAX_FILE_BYTES) {
      setFileError("That file is too large. The limit is 10 MB.");
      return;
    }

    setIsParsing(true);
    setFileName(selectedFile.name);

    try {
      const text = await parseResume(selectedFile);
      setValue("resume", text, { shouldValidate: true, shouldDirty: true });
      try {
        sessionStorage.setItem(FILE_KEY, selectedFile.name);
      } catch {}
    } catch (err) {
      setFileName("");
      setFileError(
        err instanceof Error
          ? err.message
          : "Couldn't read that file. Try another one.",
      );
    } finally {
      setIsParsing(false);
    }
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);

    // lets the user pick the same file again later
    e.target.value = "";
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault(); // required, otherwise the drop event never fires
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); // stops the browser from opening the file
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) processFile(droppedFile);
  }

  async function onSubmit(data: ResumeFormData) {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fileName }),
      });

      let result: { message?: unknown } = {};
      try {
        result = await response.json();
      } catch {}

      if (!response.ok) {
        throw new Error(
          typeof result.message === "string"
            ? result.message
            : "Something went wrong. Please try again.",
        );
      }

      reset();
      setFileName("");
      try {
        sessionStorage.removeItem(FILE_KEY);
      } catch {}
      router.push("/reports");
    } catch (error) {
      setError("resume", {
        type: "manual",
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isParsing,
    isSubmitting,
    fileName,
    fileInputRef,
    handleSample,
    handleFileChange,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    fileError,
  };
}
