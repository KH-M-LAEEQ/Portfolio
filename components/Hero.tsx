import { ArrowRight, Mail } from "lucide-react";
import { articles, experience, profile, projects } from "@/data/cv";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/icons";
import AgentConsole, { type ConsoleLine } from "@/components/AgentConsole";
import AgentCore from "@/components/AgentCore";
import ResumePreview from "@/components/ResumePreview";

export default function Hero() {
  const liveCount = projects.filter((p) => p.status === "Completed · Deployed").length;
  const publishedCount = articles.filter((a) => a.href && !a.upcoming).length;

  // The console narrates a real "run" built from the CV data.
  const lines: ConsoleLine[] = [
    { key: "goal", value: "ship AI agents that are reliable, not just impressive" },
    {
      key: "memory",
      value: experience.map((e) => `${e.role.replace(/ \(.*\)/, "")} @ ${e.company}`).join(" · "),
    },
    {
      key: "tool",
      value: `projects.search() → ${projects.length} built, ${liveCount} live in production`,
    },
    {
      key: "tool",
      value: `medium.read() → ${publishedCount} articles on agents, RAG & LLM systems`,
    },
    { key: "stack", value: "Next.js · Django · FastAPI · RAG · MCP · Flutter" },
    { key: "answer", value: "Open to roles & collaborations." },
  ];

  const socials = [
    { label: "GitHub", href: profile.github, icon: <GithubIcon width={16} height={16} /> },
    { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon width={16} height={16} /> },
    { label: "Medium", href: profile.medium, icon: <MediumIcon width={16} height={16} /> },
    { label: "Email", href: `mailto:${profile.email}`, icon: <Mail size={16} /> },
  ];

  return (
    <section id="top" className="relative scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-24 lg:pt-20">
        <div className="relative z-10 min-w-0">
          <p className="animate-fade-in-up flex items-center gap-2.5 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            Available for new work · Lahore &amp; remote
          </p>

          <h1
            className="animate-fade-in-up mt-8 font-display text-[clamp(3.4rem,9.5vw,7.25rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
            style={{ animationDelay: "80ms" }}
          >
            <span className="block">Khawaja</span>{" "}
            <span className="block">Muhammad</span>{" "}
            <span className="block italic text-accent">Laeeq</span>
          </h1>

          <p
            className="animate-fade-in-up mt-8 max-w-xl text-lg leading-relaxed text-foreground/75"
            style={{ animationDelay: "160ms" }}
          >
            {profile.title}. I build web, mobile, and AI products end to end, with a focus on
            agentic systems that plan, use tools, remember, and still behave when they touch
            real data.
          </p>

          <div
            className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
            >
              See selected work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <ResumePreview />
          </div>

          <ul
            className="animate-fade-in-up mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
            style={{ animationDelay: "320ms" }}
          >
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <span className="text-foreground/70 transition-colors group-hover:text-accent">{s.icon}</span>
                  <span className="link-draw pb-0.5">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* The sphere, with the console resting just below it. */}
        <div className="relative min-w-0 lg:h-[640px]">
          <p className="absolute right-0 top-0 z-10 font-display text-sm italic text-muted lg:top-6">
            Fig. 1 — an agent, mid-thought
          </p>
          <div className="relative -mx-6 h-[340px] sm:h-[420px] lg:absolute lg:-inset-x-8 lg:inset-y-0 lg:mx-0 lg:h-auto">
            <AgentCore />
          </div>
          <div
            className="animate-fade-in-up relative z-10 -mt-12 sm:-mt-16 lg:absolute lg:bottom-4 lg:left-0 lg:right-6 lg:mt-0"
            style={{ animationDelay: "300ms" }}
          >
            <AgentConsole lines={lines} />
          </div>
        </div>
      </div>
    </section>
  );
}
