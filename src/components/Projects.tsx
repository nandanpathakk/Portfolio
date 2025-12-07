

import { MagicCard } from "./ui/MagicCard";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { projectsData } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-primary">
          Selected Work
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {projectsData.map((project, i) => (
            <MagicCard key={i} className="flex flex-col h-full group">
              <div className="h-48 w-full relative overflow-hidden bg-neutral-900/50 border-b border-white/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  <a
                    href={project.link}
                    target="_blank"
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