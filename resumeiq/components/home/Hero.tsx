import { ScoreCard } from "./ScoreCard";
const Hero = () => {
  return (
    <section className="my-8 gap-6 sm:my-16 sm:gap-6 lg:gap-10 lg:my-20 flex flex-col items-center mx-5 md:mx-12">
      <p className="bg-lighter-gray border border-border py-1.5 px-4 rounded-full inter font-semibold text-black text-[13px]">
        Feedback in seconds, not days
      </p>
      <div className="flex flex-col items-center text-center md:max-w-200">
        <h2 className="text-black leading-8.5 md:leading-12 lg:leading-16 font-extrabold text-[28px] sm:text-[32px] md:text-[40px] lg:text-page mb-6 md:mb-4 font-inter">
          Know exactly why your resume gets passed over.
        </h2>
        <p className="font-inter text-body-lg md:text-[20px] text-muted-gray">
          ResumeIQ reads your resume like an ATS and an experienced hiring
          manager. Get an instant score, targeted critique, and instant
          bullet-point rewrites.
        </p>
      </div>
      <div>
        <ScoreCard />
      </div>
    </section>
  );
};

export default Hero;
