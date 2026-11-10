"use client";
import { Separator } from "@/components/ui/separator";
import { useResumeForm } from "@/data/dataClient";
import { AnalyzeButton, TextArea } from "@/components/common/Analyze";
import { FileSelect } from "@/components/analyze/FileSelect";

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
    <main className="max-w-160 m-4 sm:m-20 sm:mt-12 lg:mt-16 lg:mx-80 lg:mb-25 font-inter flex flex-col justify-center gap-5 sm:gap-8 lg:gap-10 items-center font-inter">
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
          <li className="font-semibold text-[13px] sm:text-sm self-start">
            Resume text
          </li>{" "}
          <li className="font-semibold text-[12px] sm:text-[13px] self-end">
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
