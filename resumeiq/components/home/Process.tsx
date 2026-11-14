const Process = () => {
  return (
    <section className="px-4 py-9 md:px-10 md:py-16 lg:p-20 text-center">
      <p className="font-bold font-inter text-[11px] md:text-[12px] text-primary mb-1 md:mb-2 lg:mb-3 tracking-wider">
        SIMPLE PROCESS
      </p>
      <p className="font-black font-inter text-[22px] md:text-[24px] lg:text-[32px] text-black mb-6 md:mb-10 lg:mb-14">
        How it works
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-12">
        <Card
          id="01"
          title="Paste or upload"
          desc="Paste your raw resume text or drop in your current PDF/Word document."
        />
        <Card
          id="02"
          title="Get scored"
          desc="Receive an objective assessment of your impact, clarity, and ATS alignment."
        />
        <Card
          id="03"
          title="Copy rewrites"
          desc="See line-by-line recommendations and copy metrics-driven bullet points."
        />
      </div>
    </section>
  );
};

type CardProps = {
  id: string;
  title: string;
  desc: string;
};

const Card = ({ id, title, desc }: CardProps) => {
  return (
    <div className="p-4 sm:p-5 lg:p-6 bg-background rounded-lg text-left border-[1.5px] border-border">
      <span className="text-primary font-black inline-block font-inter text-[28px] lg:text-[36px] mb-3 sm:mb-4 lg:mb-5">
        {id}
      </span>
      <p className="font-bold font-inter text-[16px] lg:text-[18px] mb-1 lg:mb-2">
        {title}
      </p>
      <p className="text-[13px] lg:text-[14px] font-inter text-dark-gray">
        {desc}
      </p>
    </div>
  );
};

export default Process;
