"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // swap for your error reporting later
  }, [error]);

  return (
    <section className="flex flex-1 min-h-[60vh] w-full items-center justify-center bg-background p-4 sm:p-10 font-inter">
      <div
        role="alert"
        className="flex w-full max-w-md flex-col items-center gap-4 sm:gap-5 rounded-lg border-[1.5px] border-border bg-white px-6 py-12 sm:p-14 text-center"
      >
        <TriangleAlert className="size-8 sm:size-10 text-score-red" />
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <h1 className="text-[18px] sm:text-xl font-extrabold">
            Something went wrong
          </h1>
          <p className="text-[13px] lg:text-sm text-dark-gray">
            We couldn&apos;t load this page. Try again, and if it keeps
            happening, come back in a few minutes.
          </p>
          {error.digest && (
            <p className="text-[11px] text-light-gray">
              Reference: {error.digest}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={reset}
            className="rounded-md px-4 py-2 sm:px-5 bg-primary text-white font-semibold tracking-wide text-[13px] lg:text-sm hover:bg-primary/80 cursor-pointer"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-md px-4 py-2 sm:px-5 border-[1.5px] border-border font-semibold tracking-wide text-[13px] lg:text-sm hover:bg-background"
          >
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
