export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-px w-6 bg-gradient-to-r from-accent to-accent-2" />
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          <span className="text-accent-2">{"// "}</span>
          {eyebrow}
        </p>
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
    </div>
  );
}
