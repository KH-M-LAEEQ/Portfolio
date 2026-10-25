import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import { education } from "@/data/cv";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading id="education" title="Education" />
        </Reveal>

        <ol className="grid gap-5 md:grid-cols-2">
          {education.map((edu, i) => {
            const [short, ...rest] = edu.degree.split(" — ");
            return (
              <li key={edu.school}>
                <Reveal delay={Math.min(i * 80, 240)}>
                  <Card hover={false} className="h-full rounded-xl p-6 md:p-8">
                    <p className="font-mono text-xs text-muted">{edu.period}</p>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-foreground">
                      {rest.length ? rest.join(" — ") : short}
                    </h3>
                    {rest.length > 0 && (
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                        {short}
                      </p>
                    )}
                    <p className="mt-5 text-sm text-foreground/70">{edu.school}</p>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
