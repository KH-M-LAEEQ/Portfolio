import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Toolbelt from "@/components/Toolbelt";
import { buildToolGroups } from "@/lib/skillUsage";

export default function Skills() {
  const groups = buildToolGroups();

  return (
    <section id="skills" className="scroll-mt-32 border-b border-border lg:scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            id="skills"
            title={
              <>
                Skills <span className="italic text-accent">and tools</span>
              </>
            }
            intro="The tools I work with day to day, grouped by area."
          />
        </Reveal>
        <Reveal delay={80}>
          <Toolbelt groups={groups} />
        </Reveal>
      </div>
    </section>
  );
}
