import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education, experience, profile } from "@/data/cv";

export default function About() {
  const degree = education[0];
  const latest = experience[experience.length - 1];

  const facts: [string, string][] = [
    ["Role", profile.title],
    ["Based in", `${profile.location}, open to remote`],
    ["Studying", `BS Computer Science, UCP (${degree.period})`],
    ["Latest", `${latest.role}, ${latest.company}`],
    ["Focus", "Agentic AI, RAG, full-stack development"],
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
            <div>
              <h3 className="text-sm font-semibold text-foreground">At a glance</h3>
              <dl className="mt-4 divide-y divide-border border-y border-border">
                {facts.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 text-sm">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-foreground">{value}</dd>
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
