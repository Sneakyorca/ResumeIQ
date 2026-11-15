import { LegalPage, Section } from "@/components/legal/LegalPage";

export const metadata = { title: "Privacy Policy | ResumeIQ" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 14, 2026">
      <Section heading="About this project">
        <p>
          ResumeIQ is a personal project run by Abdulmaleek Odetunde, an
          individual developer, not a company. See more of my work at{" "}
          <a
            href="https://portfolio-puce-eta-57.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline underline-offset-2"
          >
            my portfolio
          </a>
          . ResumeIQ is offered free of charge and may change or be shut down at
          any time. If it is shut down, stored accounts and reports will be
          deleted.
        </p>
      </Section>
      <Section heading="What we collect">
        <p>
          Your account details (name, email, and a password stored in hashed
          form by our authentication provider), the resumes you upload or paste,
          and the reports generated from them. If you sign in with Google, we
          receive your name and email from Google.
        </p>
      </Section>

      <Section heading="How resumes are handled">
        <p>
          Uploaded files are read in memory to extract text and are not saved.
          For scanned files, the document is sent temporarily to Google&apos;s
          Gemini API to read the text. The resume text is also sent to Gemini to
          produce your analysis.
        </p>
        <p>
          We store the resulting report (scores, feedback, and suggested
          rewrites, which may quote short parts of your resume), not your
          original file.
        </p>
      </Section>

      <Section heading="Third-party processors">
        <p>
          Supabase (authentication and database), Google (Gemini API and Google
          sign-in), and Vercel (hosting). Content sent to the Gemini API on its
          free tier may be used by Google to improve its products. Please
          don&apos;t submit information you aren&apos;t comfortable sharing on
          that basis.
        </p>
      </Section>

      <Section heading="Cookies">
        <p>
          We use cookies only to keep you signed in. We don&apos;t use
          advertising cookies.
        </p>
      </Section>

      <Section heading="Retention and deletion">
        <p>
          Reports are kept until you delete them or your account. To delete your
          account and all of its reports, email us at the address below.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          Depending on where you live, you may have the right to access,
          correct, or delete your data. Contact us and we&apos;ll help.
        </p>
      </Section>

      <Section heading="Contact">
        <p>resumeiq.help@gmail.com</p>
      </Section>
    </LegalPage>
  );
}
