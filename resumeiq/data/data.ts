import type { Report } from "@/lib/ai/analyzeText";
export const isLoggedIn = false;
export const profile = {
  name: "Judeius Namius",
};

const g = globalThis as unknown as { __reports?: Report[] };

export const sampleResume = `
JOHN DOE
Frontend Developer

Email: john.doe@email.com
Phone: +1 (555) 123-4567
Location: New York, USA
Portfolio: https://johndoe.dev
LinkedIn: https://linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Motivated Frontend Developer with 3+ years of experience building responsive, user-friendly web applications. Proficient in React, TypeScript, JavaScript, and modern CSS frameworks. Passionate about creating accessible and high-performance digital experiences.

WORK EXPERIENCE

Frontend Developer | TechNova Solutions
January 2023 – Present
- Developed responsive web applications using React, TypeScript, and Tailwind CSS.
- Improved application loading performance by 35% through code optimization and lazy loading.
- Collaborated with designers and backend developers to deliver scalable features.
- Implemented reusable UI components, reducing development time by 25%.

Junior Web Developer | DigitalCraft Agency
June 2021 – December 2022
- Built and maintained client websites using HTML, CSS, JavaScript, and React.
- Converted Figma designs into responsive web interfaces.
- Fixed bugs and improved cross-browser compatibility.
- Participated in code reviews and team development meetings.

EDUCATION

Bachelor of Science in Computer Science
University of New York
2017 – 2021

SKILLS
- JavaScript
- TypeScript
- React.js
- Next.js
- HTML5
- CSS3
- Tailwind CSS
- Git & GitHub
- REST APIs
- Responsive Web Design

PROJECTS

E-Commerce Platform
- Built a responsive e-commerce application with product filtering, shopping cart, and checkout functionality.
- Integrated REST APIs for product data management.
- Technologies: React, TypeScript, Tailwind CSS.

Task Management Application
- Developed a task management application with task creation, editing, deletion, and filtering.
- Implemented local storage for persistent data.
- Technologies: React, JavaScript, CSS.

CERTIFICATIONS
- Meta Front-End Developer Professional Certificate
- JavaScript Algorithms and Data Structures – freeCodeCamp

LANGUAGES
- English (Fluent)
- Spanish (Intermediate)
`;
export const reports: Report[] = (g.__reports ??= [
  {
    overallScore: 72,
    fileName: "John_Doe_Senior_Designer.pdf",
    jobTitle: "Product Designer",
    createdAt: Date.now() - 2 * 86_400_000, // 2 days ago
    feedBack: "Good, with room to improve",
    overview:
      "Your resume is structurally sound and has good baseline formatting, but many bullet points rely on passive responsibility statements rather than concrete quantifiable metrics. Adding numeric results to your achievements will significantly boost your score.",
    assessment: {
      impact: {
        title: "Impact",
        score: 78,
        feedBack: "Good metrics, but verbs lack punch.",
      },
      clarity: {
        title: "Clarity",
        score: 65,
        feedBack: "Several long sentences reduce readability.",
      },

      atsFriendliness: {
        title: "ATS-friendliness",
        score: 82,
        feedBack: "Excellent keyword matching.",
      },
      formatting: {
        title: "Formatting",
        score: 55,
        feedBack: "Inconsistent margins detected.",
      },
    },
    lineByLineReview: {
      impact: {
        title: "Impact",
        before:
          "Responsible for writing and designing weekly email newsletters.",
        after:
          "Designed and distributed 4 weekly newsletters, boosting open rates by 12% and conversion by 4%.",
        reason:
          "Replaced weak passive verb ('Responsible for writing') with active result-oriented verbs. Added explicit metric targets.",
      },
      clarity: {
        title: "Clarity",
        before:
          "Responsible for writing and designing weekly email newsletters.",
        after:
          "Designed and distributed 4 weekly newsletters, boosting open rates by 12% and conversion by 4%.",
        reason:
          "Replaced weak passive verb ('Responsible for writing') with active result-oriented verbs. Added explicit metric targets.",
      },

      atsFriendliness: {
        title: "ATS-friendliness",
        before:
          "Responsible for writing and designing weekly email newsletters.",
        after:
          "Designed and distributed 4 weekly newsletters, boosting open rates by 12% and conversion by 4%.",
        reason:
          "Replaced weak passive verb ('Responsible for writing') with active result-oriented verbs. Added explicit metric targets.",
      },
    },
  },
  {
    overallScore: 88,
    fileName: "John_Doe_Backend_Dev.pdf",
    jobTitle: "Software Engineer",
    createdAt: Date.now() - 2 * 86_400_000, // 2 days ago
    feedBack: "Good, with room to improve",
    overview:
      "Your resume demonstrates solid technical experience and relevant industry knowledge. However, several achievements lack measurable outcomes, and some descriptions could communicate your technical contributions more effectively. Focus on highlighting project impact, technical ownership, and measurable improvements.",

    assessment: {
      impact: {
        title: "Impact",
        score: 72,
        feedBack: "Achievements need stronger measurable outcomes.",
      },
      clarity: {
        title: "Clarity",
        score: 84,
        feedBack: "Generally clear, with a few overly complex descriptions.",
      },
      atsFriendliness: {
        title: "ATS-friendliness",
        score: 76,
        feedBack: "Some relevant technical keywords are missing.",
      },
      formatting: {
        title: "Formatting",
        score: 91,
        feedBack: "Consistent structure and excellent readability.",
      },
    },

    lineByLineReview: {
      impact: {
        title: "Impact",
        before: "Worked on improving the performance of the company website.",
        after:
          "Optimized website performance, reducing page load time by 35% and improving user experience.",
        reason:
          "Replaced a vague responsibility with a specific technical achievement and measurable performance improvement.",
      },
      clarity: {
        title: "Clarity",
        before:
          "Was responsible for the development and maintenance of various frontend components used across the application.",
        after:
          "Developed and maintained reusable frontend components across the application.",
        reason:
          "Removed unnecessary wording and simplified the sentence while preserving its original meaning.",
      },
      atsFriendliness: {
        title: "ATS-friendliness",
        before: "Built interfaces using modern web technologies.",
        after:
          "Developed responsive user interfaces using React, TypeScript, JavaScript, and Tailwind CSS.",
        reason:
          "Replaced generic terminology with relevant technical keywords that better communicate your development skills.",
      },
    },
  },
  {
    overallScore: 48,
    fileName: "John_Doe_Old_v1.pdf",
    jobTitle: "UX Generalist",
    createdAt: Date.now() - 2 * 86_400_000, // 2 days ago
    feedBack: "Good, with room to improve",
    overview:
      "Your resume communicates a good understanding of marketing responsibilities and business operations. However, it focuses more on daily activities than the results those activities produced. Strengthen your application by emphasizing campaign performance, customer engagement, and revenue-related achievements.",

    assessment: {
      impact: {
        title: "Impact",
        score: 61,
        feedBack: "Limited evidence of business and campaign results.",
      },
      clarity: {
        title: "Clarity",
        score: 73,
        feedBack: "Some descriptions are repetitive and could be more concise.",
      },
      atsFriendliness: {
        title: "ATS-friendliness",
        score: 88,
        feedBack: "Strong alignment with common marketing keywords.",
      },
      formatting: {
        title: "Formatting",
        score: 68,
        feedBack: "Section spacing and heading styles need consistency.",
      },
    },

    lineByLineReview: {
      impact: {
        title: "Impact",
        before:
          "Managed social media accounts and created content for the business.",
        after:
          "Managed 3 social media platforms, increasing audience engagement by 42% over 6 months.",
        reason:
          "Highlighted the scale of responsibility and introduced a measurable engagement result.",
      },
      clarity: {
        title: "Clarity",
        before:
          "Worked with different teams to ensure that marketing campaigns were properly planned and executed.",
        after:
          "Collaborated with cross-functional teams to plan and execute marketing campaigns.",
        reason:
          "Removed redundant phrases and used more direct language to communicate the responsibility.",
      },
      atsFriendliness: {
        title: "ATS-friendliness",
        before:
          "Helped attract customers through online promotional activities.",
        after:
          "Executed digital marketing campaigns using SEO, email marketing, content strategy, and social media advertising.",
        reason:
          "Introduced specific marketing terminology to improve keyword relevance and communicate practical expertise.",
      },
    },
  },
]);

type Row = {
  id: string;
  file_name: string | null;
  job_title: string | null;
  overall_score: number;
  verdict: string | null;
  overview: string | null;
  category_scores: Record<
    string,
    { title: string; score: number; feedback: string }
  >;
  rewrites: Record<
    string,
    { title: string; before: string; after: string; reason: string }
  >;
  created_at: string;
};

export const toReport = (r: Row) => ({
  id: r.id,
  fileName: r.file_name,
  jobTitle: r.job_title,
  overallScore: r.overall_score,
  feedback: r.verdict,
  overview: r.overview,
  assessment: r.category_scores, // same shape, no reshaping
  lineByLineReview: r.rewrites, // same shape, no reshaping
  createdAt: r.created_at, // format "10 mins ago" in the UI
});
