import Image from "next/image";

/** Shared card + logo used by /auth, /auth/forgot-password and /auth/reset-password */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex-1 bg-background w-full flex items-start justify-center">
      <div className="p-5 sm:p-8 m-4 flex-1 sm:m-16 sm:mb-20 lg:m-20 sm:max-w-100 gap-5 sm:gap-6 bg-white rounded-xl border-[1.5px] border-border flex flex-col items-center">
        <p className="text-black text-sm md:text-base font-sans font-bold flex items-center gap-1.5 sm:gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="size-4.5 md:size-5"
            width={32}
            height={32}
          />
          ResumeIQ
        </p>
        {children}
      </div>
    </section>
  );
}
