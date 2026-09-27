import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education, experience } from "@/data/cv";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Where I've worked & studied" title="Experience & Education" />
        </Reveal>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Experience
          </p>
          <div className="grid gap-4">
            {experience.map((exp, i) => {
              const card = (
                <div className="h-full rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
                  <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted">
                    {exp.period}
                  </p>
                  <h3 className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-foreground">
                    {exp.role}
                    {exp.fileUrl && (
                      <ExternalLink
                        size={14}
                        className="flex-shrink-0 text-muted transition-colors group-hover:text-accent"
                      />
                    )}
                  </h3>
                  <p className="text-sm font-medium text-accent">{exp.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                    {exp.description}
                  </p>
                </div>
              );
              return (
                <Reveal key={exp.company} delay={Math.min(80 + i * 80, 240)}>
                  {exp.fileUrl ? (
                    <a
                      href={exp.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                    >
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">
            Education
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((edu, i) => (
              <Reveal key={edu.school} delay={Math.min(80 + i * 80, 240)}>
                <div className="h-full rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
                  <p className="font-mono text-xs font-medium uppercase tracking-wide text-muted">
                    {edu.period}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-accent">{edu.school}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
