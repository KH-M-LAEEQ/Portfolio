export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
    </div>
  );
}
