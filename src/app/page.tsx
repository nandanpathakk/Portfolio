"use client";

import dynamic from "next/dynamic";
import Welcome from "@/components/Welcome";

const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Experience = dynamic(() => import("@/components/Experience"));
const Projects = dynamic(() => import("@/components/Projects"));
const Terminal = dynamic(() => import("@/components/interactive/Terminal"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"));

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