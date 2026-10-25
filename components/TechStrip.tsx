import {
  siDart,
  siDjango,
  siDocker,
  siFastapi,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siJavascript,
  siNextdotjs,
  siPostman,
  siPython,
  siReact,
  type SimpleIcon,
} from "simple-icons";
import { skillGroups } from "@/data/cv";

// Display order for the strip. `icon: null` renders a text wordmark instead
// (Simple Icons no longer ships AWS logos).
const TECH: { name: string; icon: SimpleIcon | null }[] = [
  { name: "Python", icon: siPython },
  { name: "JavaScript", icon: siJavascript },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Django", icon: siDjango },
  { name: "FastAPI", icon: siFastapi },
  { name: "Flutter", icon: siFlutter },
  { name: "Dart", icon: siDart },
  { name: "Firebase", icon: siFirebase },
  { name: "Docker", icon: siDocker },
  { name: "AWS", icon: null },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "Postman", icon: siPostman },
];

function TechItem({ tech }: { tech: (typeof TECH)[number] }) {
  return (
    <li className="flex flex-shrink-0 items-center gap-3 px-7 text-[#d4ad5f] md:px-9">
      {tech.icon ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current md:h-7 md:w-7">
          <path d={tech.icon.path} />
        </svg>
      ) : (
        <span aria-hidden="true" className="text-lg font-bold leading-none tracking-tight md:text-xl">
          aws
        </span>
      )}
      <span className="whitespace-nowrap font-display text-xl md:text-2xl">{tech.name}</span>
    </li>
  );
}

/**
 * The technologies from the CV as a slow, continuous marquee under the hero:
 * gold logos on a black band, the same in both themes.
 * Pauses on hover; stands still for people who prefer reduced motion.
 */
export default function TechStrip() {
  const known = skillGroups.flatMap((g) => g.skills);
  // Only show what's actually listed in the CV ("AWS" covers the AWS services).
  const items = TECH.filter((t) =>
    t.name === "AWS" ? known.some((s) => s.startsWith("AWS")) : known.includes(t.name),
  );

  return (
    <section aria-labelledby="tech-strip-title" className="bg-[#141312]">
      <div className="mx-auto max-w-6xl px-6 pt-10 md:pt-12">
        <p
          id="tech-strip-title"
          className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[#9d998f]"
        >
          Technologies I build with
        </p>
      </div>
      <div className="marquee overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] md:py-10">
        <div className="animate-marquee flex w-max">
          <ul className="flex">
            {items.map((tech) => (
              <TechItem key={tech.name} tech={tech} />
            ))}
          </ul>
          {/* Second copy makes the loop seamless; hidden from screen readers. */}
          <ul className="flex" aria-hidden="true">
            {items.map((tech) => (
              <TechItem key={tech.name} tech={tech} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
