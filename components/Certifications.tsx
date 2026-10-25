import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { certifications } from "@/data/cv";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            id="certifications"
            title="Certifications"
            intro="Checks passed along the way. Each one links to its certificate and, where available, the issuer's verification page."
          />
        </Reveal>

        <ol className="grid border-t border-border md:grid-cols-2 md:gap-x-10">
          {certifications.map((cert, i) => (
            <li key={cert.name} className="border-b border-border">
              <Reveal delay={Math.min(i * 50, 300)}>
                <div className="group flex items-start gap-4 py-5">
                  <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    {cert.fileUrl ? (
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-accent"
                        aria-label={`View certificate: ${cert.name}`}
                      >
                        {cert.name}
                        <ArrowUpRight size={14} className="text-muted" />
                      </a>
                    ) : (
                      <span className="font-medium text-foreground">{cert.name}</span>
                    )}
                    {cert.courseTitle && cert.courseTitle !== cert.name && (
                      <p className="mt-0.5 text-sm text-foreground/65">{cert.courseTitle}</p>
                    )}
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                      {cert.issuer && <span>{cert.issuer}</span>}
                      {cert.verifyUrl && cert.verifyUrl !== cert.fileUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          verify ↗
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
