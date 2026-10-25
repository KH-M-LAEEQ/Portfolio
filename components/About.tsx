import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education, experience, profile } from "@/data/cv";

export default function About() {
  const degree = education[0];
  const latest = experience[experience.length - 1];

  // Shown as the agent's "context": the facts it starts every run with.
  const context: [string, string][] = [
    ["name", profile.name],
    ["role", profile.title],
    ["based_in", `${profile.location} · open to remote`],
    ["studying", `${degree.degree.split(" — ")[0]} @ UCP, ${degree.period}`],
    ["latest", `${latest.role} @ ${latest.company}`],
    ["focus", "agentic AI · RAG · full-stack"],
  ];

  return (
    <section id="about" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
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

        <div className="grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <Reveal delay={60}>
            <p className="font-display text-2xl leading-snug text-foreground md:text-[1.9rem] md:leading-[1.3]">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="card rounded-xl">
              <p className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                context.json
                <span className="text-accent">loaded</span>
              </p>
              <dl className="space-y-3 p-5 font-mono text-[13px]">
                {context.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[6.5rem_1fr] gap-3">
                    <dt className="text-muted">{key}</dt>
                    <dd className="text-foreground/90">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
