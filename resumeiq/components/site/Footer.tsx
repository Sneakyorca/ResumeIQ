import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between p-6 sm:px-10 sm:py-8 lg:px-20 border border-t-border bg-background">
      <div className="flex flex-col gap-1">
        <p className="font-inter text-dark-gray lg:text-body-sm text-[13px]">
          ResumeIQ — AI critique for resumes and portfolios.
        </p>
        <p className="font-inter text-light-gray text-xs lg:text-[13px]">
          Built by{" "}
          <a
            href="https://portfolio-puce-eta-57.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-dark-gray underline underline-offset-2 hover:text-black"
          >
            Abdulmaleek Odetunde
          </a>
        </p>
      </div>
      <nav
        aria-label="Legal"
        className="flex gap-4 md:gap-6 [&>a]:lg:text-body-sm [&>a]:text-[13px] [&>a]:font-inter [&>a]:text-light-gray [&>a]:hover:text-black"
      >
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of Service</Link>
      </nav>
    </footer>
  );
};

export default Footer;
