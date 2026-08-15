"use client";

import Welcome from "@/components/Welcome";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Terminal from "@/components/interactive/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

// These are imported statically on purpose. Wrapping them in next/dynamic
// code-splits each section, and until its chunk lands React renders the
// placeholder instead of the server-rendered markup — so #skills, #projects
// etc. briefly vanish from the DOM after hydration and anchor links pointing
// at them do nothing. Every section here is anchor-navigable, so they need to
// be present from the first paint.
export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Welcome />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Terminal />
      <Contact />
      <Footer />
      <ScrollProgress />
    </main>
  );
}
