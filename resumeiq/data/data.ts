import type { Report } from "@/lib/ai/analyzeText";

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
export const reports: Report[] = (g.__reports ??= []);

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
