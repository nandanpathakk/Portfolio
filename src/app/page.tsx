"use client";

import Welcome from "@/components/Welcome";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Terminal from "@/components/interactive/Terminal";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      <Welcome />
      <div className="space-y-24 pb-24">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </div>
      <Footer />
      <ScrollProgress />
    </main>
  );
}