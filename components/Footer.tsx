import { Mail } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/cv";

export default function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-20 overflow-hidden bg-surface-2/50">
      <div
        aria-hidden
        className="animate-blob-breathe pointer-events-none absolute left-1/2 top-0 h-[380px] w-[640px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_8%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Let's work together" title="Contact" />
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <p className="mb-6 text-foreground/80">
              Open to internships, collaborations, and interesting problems —
              send a message directly:
            </p>
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon width={16} height={16} />
              {profile.githubHandle}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon width={16} height={16} />
              {profile.linkedinHandle}
            </a>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-xs text-muted">
          {profile.name} · built with Next.js &amp; Tailwind
        </p>
      </div>
    </footer>
  );
}
