import { Briefcase, Building2, GraduationCap, MapPin, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { experience, profile } from "@/data/cv";

export default function About() {
  const facts = [
    { icon: Briefcase, label: "Role", value: [profile.title] },
    { icon: MapPin, label: "Based in", value: [`${profile.location}, open to remote`] },
    {
      icon: GraduationCap,
      label: "Education",
      value: ["BS Computer Science, UCP"],
    },
    { icon: Sparkles, label: "Focus", value: ["Agentic AI, RAG, full-stack development"] },
    {
      icon: Building2,
      label: "Experience",
      value: experience.map((e) => `${e.role.replace(/ \(.*\)/, "")} @ ${e.company}`),
    },
  ];

  return (
    <section id="about" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20 md:py-28">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-14 select-none font-display text-[10rem] leading-none text-foreground/[0.04] md:-top-20 md:text-[17rem]"
        >
          01
        </span>

        <Reveal>
          <SectionHeading
            id="about"
            title={
              <>
                About <span className="italic text-muted">me</span>
              </>
            }
          />
        </Reveal>

        <div className="relative grid gap-14 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal delay={40}>
            <div className="relative pl-8 md:pl-10">
              <span
                aria-hidden="true"
                className="absolute -left-1 -top-6 font-display text-7xl italic leading-none text-accent/35 md:text-8xl"
              >
                &ldquo;
              </span>
              <p className="font-display text-2xl leading-snug text-foreground md:text-[1.9rem] md:leading-[1.32]">
                {profile.summary}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <TiltCard className="relative overflow-hidden rounded-3xl border border-accent/[0.08] bg-gradient-to-br from-accent/[0.06] via-surface-2 to-accent/[0.05] p-7 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.3)] md:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-accent/[0.02]"
              />
              <span
                aria-hidden="true"
                className="animate-drift pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-accent/15 blur-[80px]"
              />
              <span
                aria-hidden="true"
                className="animate-drift-reverse pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-accent/[0.08] blur-[70px]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              />
              <div
                className="relative grid gap-x-10 gap-y-10 sm:grid-cols-2"
                style={{ transform: "translateZ(40px)" }}
              >
                {facts.map(({ icon: Icon, label, value }, i) => (
                  <div key={label} className="group">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                        <Icon size={12} strokeWidth={1.75} />
                        {label}
                      </p>
                    </div>
                    <div className="mt-2.5 space-y-2">
                      {value.map((line) => (
                        <p
                          key={line}
                          className="font-display text-xl italic leading-relaxed text-foreground md:text-[1.4rem]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    <span className="mt-4 block h-px w-10 bg-accent/40 transition-all duration-300 group-hover:w-16" />
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
