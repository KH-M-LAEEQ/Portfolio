export const profile = {
  name: "Khawaja Muhammad Laeeq",
  title: "Full-Stack & Agentic AI Developer",
  location: "Lahore, Pakistan",
  phone: "+92 334 8167493",
  email: "khawajalaeeq2@gmail.com",
  github: "https://github.com/khawaja-laeeq",
  githubHandle: "github.com/khawaja-laeeq",
  linkedin: "https://www.linkedin.com/in/khawaja-laeeq",
  linkedinHandle: "linkedin.com/in/khawaja-laeeq",
  medium: "https://medium.com/@khawaja-laeeq",
  mediumHandle: "medium.com/@khawaja-laeeq",
  summary:
    "Agentic AI and Full-Stack Developer with hands-on experience across web, mobile, databases, and cloud infrastructure. I've worked as an Agentic AI Intern at Arbisoft, building full-stack applications and integrating LLMs into agentic workflows, and as an ML Intern at Arch Technologies, working on NLP, embeddings, and RAG pipelines. I bring that practical AI/LLM experience into my own projects — from LLM-powered recommendation systems to agentic tools that monitor competitor activity and surface insights.",
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export const education: Education[] = [
  {
    school: "University of Central Punjab (UCP), Lahore",
    degree: "BSCS — Bachelor of Science in Computer Science",
    period: "2023 – 2027",
  },
  {
    school: "Forman Christian College, Lahore",
    degree: "FSC — Intermediate",
    period: "2021 – 2023",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  fileUrl?: string;
};

export const experience: Experience[] = [
  {
    company: "Arbisoft",
    role: "Agentic AI Intern",
    period: "June 1, 2026 – August 7, 2026",
    description:
      "Built full-stack web applications using Django and React, working across frontend, backend, REST APIs, authentication systems, and testing practices. Learned about MCP, embeddings, and LLMs, and applied that knowledge to integrate LLMs into applications and build agentic workflows.",
    fileUrl: "/certificates/arbisoft-internship-letter.pdf",
  },
  {
    company: "Arch Technologies",
    role: "ML Intern (Remote)",
    period: "September 1, 2026 – November 4, 2026",
    description:
      "Developed and evaluated machine learning models using Python, NumPy, Pandas, and Scikit-learn. Explored neural networks and deep learning with PyTorch, and worked on NLP tasks including text classification, embeddings, and transformers. Gained exposure to LLM application development, RAG pipelines, and vector databases.",
  },
];

export type ProjectStatus = "Completed" | "Completed · Deployed";

export type ProjectLink = {
  label: string;
  href: string;
};

// "selected" = independent, portfolio-worthy work; "coursework" = clones and
// learning exercises, grouped separately so the section reads by judgement.
export type ProjectGroup = "selected" | "coursework";

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  featured?: boolean;
  group?: ProjectGroup;
  liveUrl?: string;
  image?: string;
  imageAspect?: string;
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
    group: "selected",
    liveUrl: "https://www.grantpilot.works",
    image: "/projects/grantpilot-opportunities.png",
    imageAspect: "1900/867",
    description:
      "An AI-powered platform that matches students with relevant scholarships based on academic profiles and eligibility criteria. Backend services handle scholarship ingestion, filtering, recommendation, and LLM-powered opportunity discovery.",
    tags: ["AI/LLM", "Recommendation Engine", "Backend", "REST APIs"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/GrantPilot" }],
  },
  {
    slug: "khawaja-law",
    name: "Khawaja and Associates",
    status: "Completed · Deployed",
    group: "selected",
    liveUrl: "https://www.khawajalaw.site",
    image: "/projects/khawaja-law.png",
    imageAspect: "1901/860",
    description:
      "A law firm website for an established Lahore tax law practice. Presents the firm's history, practice areas, team, and publications with a clean, editorial design.",
    tags: ["Next.js", "Web Design", "Law Firm"],
    links: [],
  },
  {
    slug: "olx-clone",
    name: "OLX Clone",
    status: "Completed",
    group: "coursework",
    liveUrl: "https://olx-frontend-eight.vercel.app/",
    image: "/projects/olx-clone.png",
    imageAspect: "1901/873",
    description:
      "A marketplace application with separate frontend and backend architectures. Implements authentication, product listings, search functionality, CRUD operations, REST APIs, and relational database design.",
    tags: ["Full Stack", "REST APIs", "Auth", "Relational DB"],
    links: [
      { label: "Frontend", href: "https://github.com/KH-M-LAEEQ/olx-Frontend" },
      { label: "Backend", href: "https://github.com/KH-M-LAEEQ/olx-backend" },
    ],
  },
  {
    slug: "competitive-intelligence-monitor",
    name: "Competitive Intelligence Monitor",
    status: "Completed · Deployed",
    group: "selected",
    liveUrl: "https://competitive-intelligence-monitor.vercel.app/",
    image: "/projects/competitive-intelligence-dashboard.png",
    imageAspect: "1917/868",
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
  {
    slug: "fitness-app",
    name: "Fitness App",
    status: "Completed",
    group: "selected",
    liveUrl: "https://fitnessapp-a5ec5.web.app",
    image: "/projects/fitness-app-dashboard.png",
    imageAspect: "1280/900",
    description:
      "A personalized fitness tracker built with Dart and Flutter, using Firebase as the backend service. Primarily a mobile app; the live demo is a web build of the same codebase.",
    tags: ["Flutter", "Dart", "Firebase", "Mobile"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/Fitness-App" }],
  },
  {
    slug: "pakwheels-clone",
    name: "PakWheels Mobile App Clone",
    status: "Completed",
    group: "coursework",
    description:
      "A Flutter application featuring vehicle listings, search filters, and detailed vehicle views. Designed the UI/UX from Figma wireframes, then built out responsive layouts and navigation, category browsing, and a detail view with image galleries and seller info.",
    tags: ["Flutter", "Dart", "Figma", "Mobile"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/PakWheels" }],
  },
  {
    slug: "fake-news-detector",
    name: "Fake News Detector",
    status: "Completed",
    group: "coursework",
    description:
      "A fake news detection tool built with Python and Flutter, using K-Means clustering and KNN. Paste in a news article and the model classifies it as fake or real.",
    tags: ["Python", "Flutter", "K-Means", "KNN", "ML"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/Fake-News-Detctor" }],
  },
  {
    slug: "instagram-clone",
    name: "Instagram Clone",
    status: "Completed",
    group: "coursework",
    description:
      "A social media application with authentication, posts, image uploads, and real-time feeds using Firebase Authentication, Firestore, and Storage.",
    tags: ["Firebase", "Firestore", "Auth", "Real-time"],
    links: [{ label: "GitHub", href: "https://github.com/KH-M-LAEEQ/insta" }],
  },
  {
    slug: "aws-vpn",
    name: "AWS VPN Application",
    status: "Completed",
    group: "coursework",
    description:
      "A VPN application built with Flutter and AWS EC2. Configured cloud infrastructure and implemented secure connectivity features.",
    tags: ["Flutter", "AWS EC2", "Cloud Infra", "Security"],
    links: [],
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
  {
    category: "AI",
    skills: ["LLM Applications", "Agentic AI", "RAG", "Embeddings", "Vector Databases", "MCP"],
  },
];

export type Article = {
  title: string;
  href?: string;
  publication?: string;
  date?: string;
  description?: string;
  image?: string;
  // Drafted but not yet published — no href to link to yet.
  upcoming?: boolean;
};

export const articles: Article[] = [
  {
    title: "Data Leakage in Machine Learning: Why My Model Looked Almost Perfect",
    href: "https://medium.com/@khawajalaeeq2/data-leakage-in-machine-learning-why-my-model-looked-almost-perfect-a38fb1144566",
    publication: "Medium",
    description:
      "A reproducible Scikit-learn churn experiment where one leaked feature pushed ROC-AUC to 0.978 — how to spot data leakage and why near-perfect metrics deserve suspicion.",
    image: "/articles/data-leakage-ml.jpg",
  },
  {
    title: "Why Your AI Agent Keeps Forgetting Everything (And How RAG & Long-Term Memory Fix It)",
    href: "https://medium.com/@khawajalaeeq2/why-your-ai-agent-keeps-forgetting-everything-and-how-rag-long-term-memory-fix-it-448c14b5e77b",
    publication: "Medium",
    description:
      "Why LLMs don't remember between sessions, where RAG and vector databases fit in, and what it takes to design agent memory that actually works in production.",
    image: "/articles/agent-memory-rag.jpg",
  },
  {
    title: "Redis Caching in FastAPI: TTLs, Invalidation, and Cache Stampedes",
    href: "https://medium.com/@khawajalaeeq2/redis-caching-in-fastapi-ttls-invalidation-and-cache-stampedes-845a10f6f057",
    publication: "Medium",
    description:
      "Cache-aside design in an async FastAPI app: choosing cache keys and TTLs, handling stale data and invalidation, preventing cache stampedes, and surviving Redis failures.",
  },
  {
    title: "Model Context Protocol (MCP): Why AI Agents Need More Than Tool Calling",
    href: "https://medium.com/@khawajalaeeq2/model-context-protocol-mcp-why-ai-agents-need-more-than-tool-calling-91dac0fa984b",
    publication: "Medium",
    description:
      "MCP vs. function calling, the host-client-server architecture, and why a shared protocol matters once the same integrations must work across multiple AI applications.",
  },
  {
    title: "Why Your LLM Pipeline Breaks at 50 Concurrent Requests (and How to Design for It)",
    href: "https://medium.com/@khawajalaeeq2/why-your-llm-pipeline-breaks-at-50-concurrent-requests-and-how-to-design-for-it-7f58dd979768",
    publication: "Medium",
    description:
      "What concurrency does to an async FastAPI LLM backend — connection pools, rate limits, retries, and tail latency — and how to design a pipeline that behaves predictably under load.",
    image: "/articles/llm-pipeline-concurrency.jpg",
  },
  {
    title: "RAG Is a Pipeline, Not a Prompt: Building a Production-Ready Retrieval Pipeline",
    href: "https://medium.com/@khawajalaeeq2/rag-is-a-pipeline-not-a-prompt-building-a-production-ready-retrieval-pipeline-ef2a79730289",
    publication: "Medium",
    description:
      "Tracing a RAG system end to end — ingestion, chunking, embeddings, retrieval, reranking, and evaluation — and why bad answers are usually a pipeline problem, not a model problem.",
    image: "/articles/rag-pipeline.jpg",
  },
  {
    title: "5 Guardrails I Add Before Any AI Agent Touches Real Data",
    href: "https://medium.com/@khawajalaeeq2/5-guardrails-i-add-before-any-ai-agent-touches-real-data-1cdc07b32896",
    publication: "Medium",
    description:
      "Five infrastructure-level safety layers for agents with real-world access: scoped tool permissions, allow-listed destinations, data-loss prevention, human approval gates, and full action logging.",
    image: "/articles/guard.jpg",
  },
  {
    title: "From Prototype to Production: Lessons from Deploying My First Agent",
    href: "https://medium.com/@khawajalaeeq2/from-prototype-to-production-lessons-from-deploying-my-first-agent-3a2d6ce99b58",
    publication: "Medium",
    description:
      "What it actually takes to ship an agent to production: background workers, Docker, env-based config, timeouts/retries on external calls, and full execution-trace logging.",
    image: "/articles/agent-memory-architecture.jpg",
  },
  {
    title: "Streaming Agent Responses to a React/Next.js UI in Real Time",
    href: "https://medium.com/@khawajalaeeq2/streaming-agent-responses-to-a-react-next-js-ui-in-real-time-77b782bec8ae",
    publication: "Medium",
    description:
      "Streaming an agent's progress — text, tool status, completion — to a React UI in real time using Server-Sent Events and a FastAPI backend.",
    image: "/articles/streaming-agent-ui.webp",
  },
  {
    title: "Single-Agent vs Multi-Agent Systems: When Do You Actually Need More Than One?",
    href: "https://medium.com/@khawajalaeeq2/single-agent-vs-multi-agent-systems-when-do-you-actually-need-more-than-one-9d011d28671b",
    publication: "Medium",
    description:
      "Why a single well-equipped agent usually beats multi-agent orchestration — the latter only pays off on broad, parallel tasks, at roughly 3.75x the token cost.",
    image: "/articles/single-vs-multi-agent.jpg",
  },
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
  {
    name: "Claude Academy Graduate",
    issuer: "Anthropic · Claude Academy",
    fileUrl: "https://academy.claude.com/badges/fdf918a7-0368-4f07-b971-35528ee2274a",
    verifyUrl: "https://academy.claude.com/badges/fdf918a7-0368-4f07-b971-35528ee2274a",
  },
];
