import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/cv";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-border bg-surface-2/50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Get to know me" title="About" />
        </Reveal>
        <Reveal delay={80}>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <p className="leading-relaxed text-foreground/80">{profile.summary}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
