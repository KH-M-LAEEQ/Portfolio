import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/icons";
import { profile } from "@/data/cv";

const exploreLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/articles", label: "Articles" },
];

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
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="flex flex-col gap-6">
              <a href={`mailto:${profile.email}`} className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">Email</span>
                  <span className="block text-sm font-semibold text-foreground">
                    {profile.email}
                  </span>
                </span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                className="flex items-start gap-3"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">Phone</span>
                  <span className="block text-sm font-semibold text-foreground">
                    {profile.phone}
                  </span>
                </span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <LinkedinIcon width={18} height={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">LinkedIn</span>
                  <span className="block text-sm font-semibold text-foreground">
                    {profile.linkedinHandle.replace("linkedin.com", "")}
                  </span>
                </span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <GithubIcon width={18} height={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">GitHub</span>
                  <span className="block text-sm font-semibold text-foreground">
                    {profile.githubHandle.replace("github.com", "")}
                  </span>
                </span>
              </a>
              <a
                href={profile.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MediumIcon width={18} height={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">Medium</span>
                  <span className="block text-sm font-semibold text-foreground">
                    {profile.mediumHandle.replace("medium.com", "")}
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted">Location</span>
                  <span className="block text-sm font-semibold text-foreground">
                    {profile.location} — open to remote
                  </span>
                </span>
              </div>
            </div>

            <ContactForm />
          </div>
        </Reveal>

        <nav aria-label="Site sections" className="mt-14 border-t border-border pt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
