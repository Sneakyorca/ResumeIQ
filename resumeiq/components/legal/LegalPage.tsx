import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="flex w-full flex-1 justify-center bg-background p-4 sm:p-10 lg:py-16 font-inter">
      <main className="w-full max-w-2xl rounded-lg border-[1.5px] border-border bg-white p-6 sm:p-10">
        <h1 className="text-2xl lg:text-[32px] font-extrabold">{title}</h1>
        <p className="mt-1 text-xs sm:text-[13px] text-light-gray">
          Last updated {updated}
        </p>
        <div className="mt-6 flex flex-col gap-6">{children}</div>
        <Link
          href="/"
          className="mt-8 inline-block text-[13px] font-semibold text-primary underline"
        >
          Back to home
        </Link>
      </main>
    </section>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[16px] lg:text-lg font-bold">{heading}</h2>
      <div className="flex flex-col gap-2 text-[13px] lg:text-sm leading-relaxed text-dark-gray">
        {children}
      </div>
    </div>
  );
}
