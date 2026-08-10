import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import SectionDots from "@/components/SectionDots";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <SectionDots />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
