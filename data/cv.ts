export const profile = {
  name: "Khawaja Muhammad Laeeq",
  title: "Computer Science Student & Full-Stack Developer",
  location: "Lahore, Pakistan",
  phone: "+92 334 8167493",
  email: "khawajalaeeq2@gmail.com",
  github: "https://github.com/KH-M-LAEEQ",
  githubHandle: "github.com/KH-M-LAEEQ",
  linkedin: "https://www.linkedin.com/in/khawaja-laeeq",
  linkedinHandle: "linkedin.com/in/khawaja-laeeq",
  summary:
    "Computer Science student at the University of Central Punjab (UCP) with hands-on experience in full-stack development, mobile applications, databases, cloud technologies, and AI-powered systems. Completed a Software Engineering Internship at Arbisoft and built projects involving web applications, REST APIs, cloud infrastructure, and AI-driven workflows. Passionate about building scalable software and continuously learning modern technologies.",
};

export const education = {
  school: "University of Central Punjab (UCP), Lahore",
  degree: "Bachelor of Science in Computer Science",
  period: "2023 – 2027",
};

export const experience = {
  company: "Arbisoft",
  role: "Software Engineering Intern",
  period: "June 2026 – July 2026",
  description:
    "Worked on full-stack web development concepts including frontend, backend, REST APIs, authentication systems, testing practices, and AI-assisted development workflows. Gained exposure to Agentic AI concepts, MCP, tools, memory systems, and modern software engineering methodologies.",
};

export type ProjectStatus = "Completed" | "Completed · Deployed";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  featured?: boolean;
  liveUrl?: string;
  image?: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "grantpilot",
    name: "GrantPilot",
    status: "Completed · Deployed",
    featured: true,
    liveUrl: "https://www.grantpilot.works",
    image: "/projects/grantpilot-dashboard.png",
    description:
      "An AI-powered platform that matches students with relevant scholarships based on academic profiles and eligibility criteria. Backend services handle scholarship ingestion, filtering, recommendation, and LLM-powered opportunity discovery.",
    tags: ["AI/LLM", "Recommendation Engine", "Backend", "REST APIs"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/GrantPilot" }],
  },
  {
    slug: "olx-clone",
    name: "OLX Clone",
    status: "Completed",
    description:
      "A marketplace application with separate frontend and backend architectures. Implements authentication, product listings, search functionality, CRUD operations, REST APIs, and relational database design.",
    tags: ["Full Stack", "REST APIs", "Auth", "Relational DB"],
    links: [
      { label: "Frontend", href: "https://github.com/KH-M-LAEEQ/olx-Frontend" },
      { label: "Backend", href: "https://github.com/KH-M-LAEEQ/olx-backend" },
    ],
  },
  {
    slug: "pakwheels-clone",
    name: "PakWheels Mobile App Clone",
    status: "Completed",
    description:
      "A Flutter application featuring vehicle listings, search filters, and detailed vehicle views. UI/UX designed using Figma wireframes with responsive layouts and navigation.",
    tags: ["Flutter", "Dart", "Figma", "Mobile"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/PakWheels" }],
  },
  {
    slug: "instagram-clone",
    name: "Instagram Clone",
    status: "Completed",
    description:
      "A social media application with authentication, posts, image uploads, and real-time feeds using Firebase Authentication, Firestore, and Storage.",
    tags: ["Firebase", "Firestore", "Auth", "Real-time"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/insta" }],
  },
  {
    slug: "aws-vpn",
    name: "AWS VPN Application",
    status: "Completed",
    description:
      "A VPN application built with Flutter and AWS EC2. Configured cloud infrastructure and implemented secure connectivity features.",
    tags: ["Flutter", "AWS EC2", "Cloud Infra", "Security"],
    links: [],
  },
  {
    slug: "fitness-app",
    name: "Fitness App",
    status: "Completed",
    description:
      "A personalized fitness tracker built with Dart and Flutter, using Firebase as the backend service.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/Fitness-App" }],
  },
  {
    slug: "fake-news-detector",
    name: "Fake News Detector",
    status: "Completed",
    description:
      "A fake news detection tool built with Python and Flutter, using K-Means clustering and KNN. Paste in a news article and the model classifies it as fake or real.",
    tags: ["Python", "Flutter", "K-Means", "KNN", "ML"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/Fake-News-Detctor" }],
  },
  {
    slug: "competitive-intelligence-monitor",
    name: "Competitive Intelligence Monitor",
    status: "Completed",
    description:
      "An agentic-AI-driven web app for e-commerce competitor tracking. Monitors competitor websites, surfaces comparisons and new activity, and gives AI-powered suggestions for improving your own store.",
    tags: ["FastAPI", "Next.js", "Agentic AI", "Web Scraping"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/KH-M-LAEEQ/Competitive_Intelligence_Monitor",
      },
    ],
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "Languages", skills: ["Python", "JavaScript", "Java", "C++", "C"] },
  { category: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"] },
  { category: "Mobile", skills: ["Flutter", "Dart", "XML", "Android SDK"] },
  { category: "Backend", skills: ["Django", "FastAPI", "REST APIs", "Firebase"] },
  { category: "Auth", skills: ["Firebase Authentication", "Google OAuth", "JWT"] },
  { category: "Databases", skills: ["MySQL", "PostgreSQL", "Firestore"] },
  {
    category: "Cloud & Tools",
    skills: [
      "AWS EC2",
      "AWS EKS",
      "AWS DynamoDB",
      "AWS S3",
      "AWS CloudWatch",
      "Git",
      "GitHub",
      "Docker",
      "Postman",
    ],
  },
  { category: "AI", skills: ["LLM Applications", "Agentic AI", "MCP"] },
];

export type Certification = {
  name: string;
  courseTitle?: string;
  issuer?: string;
  fileUrl?: string;
  verifyUrl?: string;
};

export const certifications: Certification[] = [
  {
    name: "Google Cloud",
    courseTitle: "Introduction to Large Language Models",
    issuer: "Google Cloud · Coursera",
    fileUrl: "/certificates/google-cloud-llm.pdf",
    verifyUrl: "https://coursera.org/verify/ADWRK50YAUHJ",
  },
  {
    name: "Algorithm Design",
    courseTitle: "QuickStart: From Algorithm Design to Working Prototype",
    issuer: "HEC Pakistan · Coursera",
    fileUrl: "/certificates/algorithm-design.pdf",
    verifyUrl: "https://coursera.org/verify/ID2HKN39YY7A",
  },
  {
    name: "Version Control",
    courseTitle: "Version Control",
    issuer: "Meta · Coursera",
    fileUrl: "/certificates/version-control.pdf",
    verifyUrl: "https://coursera.org/verify/6RPHSQXJ6URL",
  },
  {
    name: "Mobile Application Development",
    courseTitle: "Introduction to Android Mobile Application Development",
    issuer: "Meta · Coursera",
    fileUrl: "/certificates/mobile-app-development.pdf",
    verifyUrl: "https://coursera.org/verify/FAFL401899GW",
  },
  {
    name: "Front-End Development",
    courseTitle: "Introduction to Front-End Development",
    issuer: "Meta · Coursera",
    fileUrl: "/certificates/front-end-development.pdf",
    verifyUrl: "https://coursera.org/verify/WD8FLB6ZCH8N",
  },
  {
    name: "AWS Academy Graduate — Cloud Foundations",
    issuer: "AWS Academy · Credly",
    fileUrl: "https://www.credly.com/badges/4a99a823-3467-4a6f-a94f-388c32b50b4b",
    verifyUrl: "https://www.credly.com/badges/4a99a823-3467-4a6f-a94f-388c32b50b4b",
  },
  { name: "ChatGPT Prompt Engineering for Developers" },
  { name: "Agent Skills with Anthropic" },
];
