"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Code2, Globe, User, Zap } from "lucide-react";

const Card = ({ item, index, x }: { item: any, index: number, x: MotionValue<string> }) => {
  return (
    <div
      className="min-w-[85vw] md:min-w-[450px] h-[50vh] md:h-[60vh] p-6 md:p-10 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 flex flex-col justify-end hover:border-white/20 transition-colors duration-300 group"
    >
      <div className="mb-4 p-3 rounded-2xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
        {item.icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
      <p className="text-lg text-neutral-400 group-hover:text-neutral-300 transition-colors">{item.description}</p>
    </div>
  );
};

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  const items = [
    {
      title: "Who I Am",
      description: "A passionate developer with a knack for creating elegant solutions.",
      icon: <User className="h-8 w-8 text-white" />,
    },
    {
      title: "My Tech Stack",
      description: "React, Next.js, TypeScript, Tailwind CSS, and more.",
      icon: <Code2 className="h-8 w-8 text-white" />,
    },
    {
      title: "Global Mindset",
      description: "Based in India, working with the world.",
      icon: <Globe className="h-8 w-8 text-white" />,
    },
    {
      title: "Fast & Scalable",
      description: "Building performance-first applications.",
      icon: <Zap className="h-8 w-8 text-white" />,
    },
  ];

  return (
    <section ref={targetRef} id="about" className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden perspective-[1000px]">

        {/* Horizontal Scroll Container */}
        <motion.div style={{ x }} className="flex gap-4 md:gap-8 px-4 md:px-24 items-center">
          {/* Intro Text Card */}
          <div className="min-w-[85vw] md:min-w-[600px] h-[50vh] md:h-[60vh] flex flex-col justify-center p-6 md:p-12 rounded-3xl bg-transparent border-none">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 text-white tracking-tighter">
              About Me
            </h2>
            <p className="text-2xl text-neutral-400 leading-relaxed font-light">
              I build digital experiences that merge <span className="text-white font-medium">art</span> with <span className="text-white font-medium">engineering</span>.
              <br /><br />
              Scroll to explore my journey.
            </p>
          </div>

          {/* Feature Cards */}
          {items.map((item, i) => (
            <Card key={i} item={item} index={i} x={x} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}