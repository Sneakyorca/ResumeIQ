import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row justify-between p-6 sm:px-10 sm:py-8 lg:px-20 border border-t-border bg-background">
      <p className="font-inter text-dark-gray lg:text-body-sm text-[13px] mb-4 sm:m-0">
        ResumeIQ — AI critique for resumes and portfolios.
      </p>
      <div className="flex gap-4 md:gap-6 [&>a]:lg:text-body-sm [&>a]:text-[13px] [&>a]:font-inter [&>a]:text-light-gray">
        {" "}
        <Link href={"/"}>Privacy Policy</Link>{" "}
        <Link href={"/"}>Terms of Service</Link>
      </div>
    </footer>
  );
};

export default Footer;
