import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import { experience } from "@/data/cv";

export default function Experience() {
  // Newest first.
  const roles = [...experience].reverse();

  return (
    <section id="experience" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            id="experience"
            title={
              <>
                Work <span className="italic text-accent">experience</span>
              </>
            }
            intro="Internships where I shipped real code: agentic AI, full-stack applications, and machine learning."
          />
        </Reveal>

        <ol className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[7px] top-6 w-px bg-gradient-to-b from-accent via-border to-transparent md:left-[12.25rem]"
          />
          {roles.map((role, i) => {
            const card = (
              <Card className="rounded-xl p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground md:text-xl">{role.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-accent">{role.company}</p>
                  </div>
                  {role.fileUrl && (
                    <ArrowUpRight
                      size={18}
                      className="flex-shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">{role.description}</p>
              </Card>
            );

            return (
              <li key={role.company} className="relative pb-6 last:pb-0">
                <Reveal delay={Math.min(i * 70, 280)}>
                  <div className="grid gap-3 pl-8 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0">
                    <div className="relative font-mono text-xs text-muted md:pt-7 md:text-right">
                      <span
                        aria-hidden="true"
                        className="absolute -left-8 top-0.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background md:-right-[1.72rem] md:left-auto md:top-[1.6rem]"
                      />
                      {role.period}
                    </div>
                    {role.fileUrl ? (
                      <a
                        href={role.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${role.role} at ${role.company}: view internship letter`}
                        className="group block"
                      >
                        {card}
                      </a>
                    ) : (
                      <div className="group">{card}</div>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
