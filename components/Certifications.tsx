import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { certifications } from "@/data/cv";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Continuous learning" title="Certifications" />
        </Reveal>
        <ol className="grid gap-3 md:grid-cols-2">
          {certifications.map((cert, i) => {
            const content = (
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
                <span className="mt-0.5 font-mono text-sm font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-foreground/90">
                      {cert.name}
                    </span>
                    {cert.fileUrl && (
                      <ExternalLink
                        size={13}
                        className="flex-shrink-0 text-muted transition-colors group-hover:text-accent"
                      />
                    )}
                  </div>
                  {cert.issuer && (
                    <p className="mt-0.5 text-xs text-muted">{cert.issuer}</p>
                  )}
                </div>
              </div>
            );

            return (
              <li key={cert.name}>
                <Reveal delay={Math.min(i * 50, 300)}>
                  {cert.fileUrl ? (
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      aria-label={`View certificate: ${cert.name}`}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
