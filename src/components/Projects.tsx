"use client";

import { MagicCard } from "./ui/MagicCard";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Project One",
    description: "A futuristic web application built with Next.js and WebGL.",
    tags: ["Next.js", "WebGL", "Three.js"],
    link: "#",
  },
  {
    title: "Project Two",
    description: "E-commerce platform with real-time inventory management.",
    tags: ["React", "Node.js", "Socket.io"],
    link: "#",
  },
  {
    title: "Project Three",
    description: "AI-powered content generation tool for creators.",
    tags: ["OpenAI", "Python", "FastAPI"],
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-primary">
          Selected Work
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <MagicCard key={i} className="flex flex-col h-full">
              <div className="h-48 bg-neutral-900/50 border-b border-white/10" />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  <a
                    href={project.link}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}