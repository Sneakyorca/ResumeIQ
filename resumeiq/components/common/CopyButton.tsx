"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type CopyProps = {
  text: string;
  text2?: string;
  text3?: string;
  className: string;
  textAfter: string;
  iconClass: string;
  copyIcon?: boolean;
  copyItem: string | Record<string, any>;
};

const CopyButton = ({
  text,
  text2,
  text3,
  textAfter,
  className,
  iconClass,
  copyIcon = true,
  copyItem,
}: CopyProps) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      const textToCopy =
        typeof copyItem === "string"
          ? copyItem
          : `
RESUME ANALYSIS REPORT

Score: ${copyItem.score}%
File Name: ${copyItem.fileName}
Job Title: ${copyItem.jobTitle}
Feedback: ${copyItem.feedBack}

OVERVIEW
${copyItem.overview}


ASSESSMENT
${Object.values(copyItem.assessment)
  .map(
    (item: any) => `
${item.title}: ${item.score}%
Feedback: ${item.feedBack}
`,
  )
  .join("\n")}


LINE-BY-LINE REVIEW
${Object.values(copyItem.lineByLineReview)
  .map(
    (item: any) => `
${item.title}

Before:
${item.before}

After:
${item.after}

Reason:
${item.reason}
`,
  )
  .join("\n")}
`;

      await navigator.clipboard.writeText(textToCopy);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      setCopied(false);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };
  return (
    <button
      onClick={copy}
      className={`transition-all duration-200 ${className} ${
        copied
          ? "border-primary/70 text-primary sm:bg-primary/10"
          : "sm:border-border sm:text-black"
      } cursor-pointer`}
    >
      {copied ? (
        <>
          <span>{textAfter}</span>
          <Check className={iconClass} />
        </>
      ) : (
        <>
          {text}
          <span className="hidden sm:inline mx-1">
            {text2 ? `${text2}` : ""}
          </span>
          {text3}
          {copyIcon && (
            <Copy className="pl-1 size-3.5 sm:hidden stroke-3 inline-block" />
          )}
        </>
      )}
    </button>
  );
};

export default CopyButton;
