import { Bone } from "@/components/common/Bone";

export default function Loading() {
  return (
    <section
      role="status"
      aria-busy="true"
      className="p-4 sm:p-10 lg:px-12 lg:py-20 w-full flex justify-center bg-background font-inter flex-1"
    >
      <span className="sr-only">Loading your reports…</span>
      <main className="max-w-250 w-full">
        <div className="flex justify-between items-center mb-5 sm:mb-8 lg:mb-10">
          <div className="flex flex-col gap-2">
            <Bone className="h-6 sm:h-7 lg:h-9 w-40 sm:w-48" />
            <Bone className="h-3 sm:h-3.5 w-32 sm:w-44" />
          </div>
          <Bone className="h-8 sm:h-9 lg:h-10 w-24 sm:w-28" />
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg flex p-3.5 gap-3 sm:p-4 sm:gap-4 lg:gap-6 lg:p-5 border-[1.5px] border-border items-center bg-white"
            >
              <Bone className="size-12 sm:size-14 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Bone className="h-4 w-1/2" />
                <Bone className="h-3 w-1/3" />
              </div>
              <Bone className="h-8 w-16 lg:w-24" />
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}
