// Home page sections in order. Shared by section headings and the scroll rail
// so numbering stays in sync.

export type Section = {
  id: string;
  number: string;
  label: string;
};

export const sections: Section[] = [
  { id: "top", number: "00", label: "Home" },
  { id: "about", number: "01", label: "About" },
  { id: "experience", number: "02", label: "Experience" },
  { id: "education", number: "03", label: "Education" },
  { id: "projects", number: "04", label: "Projects" },
  { id: "articles", number: "05", label: "Articles" },
  { id: "skills", number: "06", label: "Skills" },
  { id: "certifications", number: "07", label: "Certifications" },
  { id: "contact", number: "08", label: "Contact" },
];

export function getSection(id: string): Section {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section: ${id}`);
  return section;
}
