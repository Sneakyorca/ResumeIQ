"use client";

import { useResumeForm } from "@/data/dataClient";
import { Separator } from "../ui/separator";
import { AnalyzeButton, TextArea } from "../common/Analyze";

const Analyze = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    fileName,
    fileInputRef,
    handleSample,
    handleFileChange,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    isParsing,
  } = useResumeForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-background p-5 md:px-20 md:py-12 lg:p-20 lg:pt-10 flex flex-col justify-center items-center gap-5 lg:gap-6"
    >
      <TextArea
        register={register}
        isDragging={isDragging}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        isParsing={isParsing}
        className={`placeholder:text-light-gray resize-none text-black font-inter rounded-lg p-3.5 text-[14px] w-full h-40 sm:h-45 md:h-60 md:p-5 lg:text-[15px] border outline-light-gray ${
          isDragging ? "border-primary bg-primary/5" : "border-border bg-white"
        }`}
      />

      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.docx"
        hidden
        onChange={handleFileChange}
      />
      <div className="flex justify-center sm:justify-between items-center w-full">
        <ul className="text-dark-gray gap-3 sm:gap-4 flex flex-col sm:flex-row [&>li>button,&>button]:underline [&>li>button,&>button]:text-[13px] [&>li>button,&>button]:cursor-pointer [&>li>button,&>button]:lg:text-[14px] justify-center items-center">
          <li>
            <button type="button" onClick={() => fileInputRef.current?.click()}>
              {fileName || "Upload a file instead (.pdf, .docx)"}
            </button>
          </li>
          <Separator
            orientation="vertical"
            className="hidden h-4 lg:h-4.25 sm:block"
          />
          <li>
            <button type="button" onClick={handleSample}>
              Try a sample
            </button>
          </li>
        </ul>
        <span className="hidden sm:block text-[12px] font-inter md:text-[13px] text-light-gray">
          No credit card required
        </span>
      </div>
      {errors.resume && (
        <p className="text-red-500 text-[13px] font-inter">
          {errors.resume.message?.toString()}
        </p>
      )}
      <AnalyzeButton isSubmitting={isSubmitting} />
    </form>
  );
};

export default Analyze;
