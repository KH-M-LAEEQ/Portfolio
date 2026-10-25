import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStrip from "@/components/TechStrip";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";
import SectionDots from "@/components/SectionDots";
import JsonLd from "@/components/JsonLd";
import { PERSON_ID, SITE_URL, WEBSITE_ID } from "@/lib/site";

// Marks the home page as a profile page about the Person defined in the root
// layout, which is what Google expects for a personal portfolio.
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
  about: { "@id": PERSON_ID },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={profilePageJsonLd} />
      <Nav />
      <SectionDots />
      <main className="flex-1">
        <Hero />
        <TechStrip />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Articles />
        <Skills />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
