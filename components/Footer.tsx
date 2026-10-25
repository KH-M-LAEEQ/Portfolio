import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/icons";
import { profile } from "@/data/cv";

const exploreLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/#skills", label: "Skills" },
  { href: "/#certifications", label: "Certifications" },
];

function ChannelRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors group-hover:border-accent group-hover:text-accent">
        {icon}
      </span>
      <span className="w-20 flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{value}</span>
      {href && (
        <ArrowUpRight
          size={15}
          className="flex-shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      )}
    </>
  );

  const className = "group flex items-center gap-4 border-b border-border py-3.5";
  return href ? (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative scroll-mt-32 overflow-hidden lg:scroll-mt-20">
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            id="contact"
            title={
              <>
                Get in <span className="italic text-accent">touch</span>
              </>
            }
            intro="Open to roles, freelance projects, and collaborations. Tell me what you're building."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
            <div className="border-t border-border">
              <ChannelRow icon={<Mail size={16} />} label="email" value={profile.email} href={`mailto:${profile.email}`} />
              <ChannelRow
                icon={<Phone size={16} />}
                label="phone"
                value={profile.phone}
                href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
              />
              <ChannelRow
                icon={<LinkedinIcon width={16} height={16} />}
                label="linkedin"
                value={profile.linkedinHandle.replace("linkedin.com", "")}
                href={profile.linkedin}
                external
              />
              <ChannelRow
                icon={<GithubIcon width={16} height={16} />}
                label="github"
                value={profile.githubHandle.replace("github.com", "")}
                href={profile.github}
                external
              />
              <ChannelRow
                icon={<MediumIcon width={16} height={16} />}
                label="medium"
                value={profile.mediumHandle.replace("medium.com", "")}
                href={profile.medium}
                external
              />
              <ChannelRow
                icon={<MapPin size={16} />}
                label="location"
                value={`${profile.location} · open to remote`}
              />
            </div>

            <div className="card rounded-xl p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            © {new Date().getFullYear()} {profile.name}
            <span className="mx-2 text-border">/</span>
            <span>Full-Stack and Agentic AI Developer</span>
          </p>
          <nav aria-label="Site sections">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
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
      </div>
    </footer>
  );
}
