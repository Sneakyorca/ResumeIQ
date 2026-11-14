import Link from "next/link";
import { Button } from "../ui/button";

const FinalCTA = () => {
  return (
    <section className="m-8 sm:m-10 lg:m-20 flex flex-col gap-5 lg:gap-6 text-center">
      <h2 className="text-[20px] sm:text-[24px] lg:text-[32px] text-black font-inter font-extrabold">
        Stop sending resumes blindly
      </h2>
      <p className="text-dark-gray font-inter text-sm lg:text-[16px]">
        Get actionable feedback in seconds. Perfect your wording, fix your
        formatting, and start landing the interviews you deserve.
      </p>
      <div className="pt-0 sm:pt-2">
        <Link
          href="/auth"
          className="bg-primary inline-flex items-center justify-center w-full sm:w-51.5 lg:w-54 h-10.5 lg:h-11.75 px-6 sm:px-8 rounded-md text-[15px] lg:text-[16px] font-semibold font-inter text-white tracking-wider mb-5 sm:mb-2 lg:mb-3"
        >
          Get Started Free
        </Link>
        <p className="text-xs text-light-gray tracking-wide">
          Instant upload · No credit card required
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
