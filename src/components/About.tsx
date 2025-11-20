"use client";

import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import { Code2, Globe, User, Zap } from "lucide-react";

export default function About() {
  const items = [
    {
      title: "Who I Am",
      description: "A passionate developer with a knack for creating elegant solutions.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
      icon: <User className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
    {
      title: "My Tech Stack",
      description: "React, Next.js, TypeScript, Tailwind CSS, and more.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
      icon: <Code2 className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Global Mindset",
      description: "Based in India, working with the world.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
      icon: <Globe className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Fast & Scalable",
      description: "Building performance-first applications.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />,
      icon: <Zap className="h-4 w-4 text-neutral-500" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-primary">
          About Me
        </h2>
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}