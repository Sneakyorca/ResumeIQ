import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-1 min-h-[60vh] flex-col items-center justify-center gap-3 font-inter"
    >
      <LoaderCircle className="size-7 animate-spin text-primary motion-reduce:animate-none" />
      <p className="text-sm text-dark-gray">Loading…</p>
    </div>
  );
}
