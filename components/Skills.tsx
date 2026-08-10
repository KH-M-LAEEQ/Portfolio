import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/data/cv";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-border bg-surface-2/50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="What I work with" title="Skills" />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={Math.min(i * 60, 240)}>
              <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-surface-2 px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
