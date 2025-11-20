"use client";

import { MagicCard } from "./ui/MagicCard";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "Git",
  "Framer Motion",
];

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-primary">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <MagicCard key={skill} className="p-6 flex items-center justify-center text-center">
              <span className="text-lg font-medium text-foreground">{skill}</span>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
}