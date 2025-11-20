"use client";

import Welcome from "@/components/Welcome";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import Terminal from "@/components/interactive/Terminal";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Welcome />
      <div className="space-y-24 pb-24">
        <About />
        <Skills />
        <Projects />
        <Terminal />
        <Experience />
      </div>
      <Footer />
    </main>
  );
}