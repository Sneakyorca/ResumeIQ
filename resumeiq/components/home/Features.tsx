import { Check } from "lucide-react";
import Image from "next/image";

const Features = () => {
  const items = [
    "ATS parsing validation",
    "Verbal impact analysis",
    "Verbal impact analysis",
  ];
  return (
    <section className="p-5 md:px-8 md:py-10 lg:p-12 xl:p-20 flex flex-col gap-6 sm:flex-row sm:gap-6 lg:gap-10 xl:gap-20 items-center">
      <div className="flex-1 min-w-0">
        <p className="font-inter font-bold text-primary text-[11px] sm:text-xs mb-2 sm:mb-6 tracking-wide">
          Why ResumeIQ
        </p>
        <h1 className="font-inter text-black font-extrabold text-[22px] sm:text-[24px] lg:text-[36px] mb-2 sm:mb-6">
          Trusted by job seekers worldwide
        </h1>
        <p className="text-dark-gray font-inter text-sm lg:text-[16px] mb-6">
          Actionable feedback powered by hiring best practices and ATS insights.
        </p>
        <ul className="gap-2.5 sm:gap-3 flex flex-col">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-black font-inter gap-2 text-[13px] sm:text-[14px] flex font-medium items-center"
            >
              <Check className="text-primary size-4 stroke-3" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative shrink-0 w-full aspect-[600/320] sm:aspect-auto sm:w-[280px] sm:h-[149px] md:w-[340px] md:h-[181px] lg:w-[420px] lg:h-[224px] xl:w-[600px] xl:h-[320px]">
        <Image
          fill
          alt="mockup image"
          src="/mockup-img.png"
          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 420px, (min-width: 768px) 340px, (min-width: 640px) 280px, 100vw"
          loading="lazy"
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Features;
