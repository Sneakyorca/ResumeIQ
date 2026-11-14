import { Bone } from "@/components/common/Bone";

export default function Loading() {
  return (
    <section
      role="status"
      aria-busy="true"
      className="p-4 sm:pt-8 sm:px-10 sm:pb-16 lg:p-20 lg:pt-8 bg-background font-inter min-h-screen"
    >
      <span className="sr-only">Loading your report…</span>
      <main className="flex flex-col gap-5 sm:gap-6">
        <Bone className="h-4 w-32" />

        {/* score card */}
        <div className="border-[1.5px] rounded-xl border-border p-4 sm:p-6 lg:p-8 flex gap-4 sm:gap-6 lg:gap-8 bg-white items-center">
          <Bone className="size-20 sm:size-28 lg:size-32 rounded-full shrink-0" />
          <div className="flex flex-col gap-3 flex-1">
            <Bone className="h-5 sm:h-6 lg:h-7 w-3/4" />
            <Bone className="h-3 w-1/3" />
            <div className="hidden sm:flex flex-col gap-2 pt-2">
              <Bone className="h-3 w-full" />
              <Bone className="h-3 w-11/12" />
              <Bone className="h-3 w-2/3" />
            </div>
          </div>
        </div>

        {/* four category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-3 flex flex-col gap-3 sm:p-4 lg:p-5 bg-white border-[1.5px] border-border rounded-lg"
            >
              <div className="flex justify-between">
                <Bone className="h-4 w-24" />
                <Bone className="h-4 w-8" />
              </div>
              <Bone className="h-1.5 w-full" />
              <Bone className="h-3 w-full" />
              <Bone className="h-3 w-4/5" />
            </div>
          ))}
        </div>

        {/* rewrites */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
          <Bone className="h-5 w-48" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3 sm:gap-4 bg-white rounded-lg border-[1.5px] border-border"
            >
              <Bone className="h-5 w-28" />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Bone className="h-20 flex-1" />
                <Bone className="h-20 flex-1" />
              </div>
              <Bone className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
