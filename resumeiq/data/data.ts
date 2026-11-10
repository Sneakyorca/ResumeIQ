export const isLoggedIn = false;
export const profile = {
  name: "Judeius Namius",
};
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
export const reportCount = 3;
export const reports = [
  {
    id: 1,
    score: 72,
    fileName: "John_Doe_Senior_Designer.pdf",
    jobTitle: "Product Designer",
    relativeDate: "10 mins ago",
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
    id: 2,
    score: 88,
    fileName: "John_Doe_Backend_Dev.pdf",
    jobTitle: "Software Engineer",
    relativeDate: "Yesterday",
  },
  {
    id: 3,
    score: 48,
    fileName: "John_Doe_Old_v1.pdf",
    jobTitle: "UX Generalist",
    relativeDate: "5 days ago",
  },
];
