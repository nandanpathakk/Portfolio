"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Globe, Database, Terminal, Zap, Cpu } from "lucide-react";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = {
    frontend: [
      { name: "React", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "Next.js", proficiency: 80 },
      { name: "CSS/Tailwind", proficiency: 95 },
      { name: "Framer Motion", proficiency: 75 },
    ],
    backend: [
      { name: "Node.js", proficiency: 80 },
      { name: "Express", proficiency: 75 },
      { name: "MongoDB", proficiency: 70 },
      { name: "GraphQL", proficiency: 65 },
      { name: "Firebase", proficiency: 85 },
    ],
    other: [
      { name: "Git/GitHub", proficiency: 90 },
      { name: "Responsive Design", proficiency: 95 },
      { name: "Performance Optimization", proficiency: 80 },
      { name: "API Integration", proficiency: 85 },
      { name: "UI/UX Principles", proficiency: 75 },
    ],
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Code size={20} />;
      case "backend":
        return <Database size={20} />;
      case "other":
        return <Zap size={20} />;
      default:
        return <Globe size={20} />;
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen w-full bg-black text-white relative overflow-hidden flex items-center justify-center py-20"
    >
      {/* Particles background - different from stars, more like data particles */}
      <div className="absolute inset-0 z-0 opacity-40">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={
              isVisible
                ? {
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.2, 1],
                    x: [0, Math.random() * 50 - 25, 0],
                    y: [0, Math.random() * 50 - 25, 0],
                  }
                : {}
            }
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Digital circuit paths in background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`circuit-${i}`}
            className="absolute bg-cyan-400 opacity-30"
            style={{
              height: "1px",
              width: `${Math.random() * 30 + 10}%`,
              top: `${(100 / 8) * i + Math.random() * 10}%`,
              left: `${Math.random() * 70}%`,
              boxShadow: "0 0 8px #22d3ee",
            }}
          />
        ))}
        
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`circuit-v-${i}`}
            className="absolute bg-cyan-400 opacity-30"
            style={{
              width: "1px",
              height: `${Math.random() * 30 + 10}%`,
              left: `${(100 / 8) * i + Math.random() * 10}%`,
              top: `${Math.random() * 70}%`,
              boxShadow: "0 0 8px #22d3ee",
            }}
          />
        ))}
      </div>
      
      {/* Main content container */}
      <motion.div 
        className="max-w-5xl w-full mx-auto px-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light italic mb-4">
            Technical Arsenal
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The tools and technologies I wield to create exceptional digital experiences,
            constantly evolving my skills to push the boundaries of what&apos;s possible.
          </p>
        </motion.div>

        {/* Skill categories */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                activeCategory === category
                  ? "bg-white/10 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-900/20"
                  : "bg-black/20 border-white/10 text-white/70 hover:bg-white/5"
              }`}
            >
              {getCategoryIcon(category)}
              <span className="capitalize">{category}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills display */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-10">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8"
          >
            {skillCategories[activeCategory as keyof typeof skillCategories].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-white">{skill.name}</h3>
                  <span className="text-white/60 text-sm">{skill.proficiency}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300"
                    initial={{ width: 0 }}
                    animate={{ width: isVisible ? `${skill.proficiency}%` : 0 }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skill nodes */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { icon: <Cpu size={24} />, title: "Performance Optimization", description: "Creating lightning-fast experiences" },
            { icon: <Terminal size={24} />, title: "Clean Code", description: "Maintainable, readable solutions" },
            { icon: <Globe size={24} />, title: "Responsive Design", description: "Flawless on every device" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-900/10 transition-all"
            >
              <div className="text-cyan-400 mb-4">{item.icon}</div>
              <h3 className="text-white text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes flow {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(10px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }
      `}</style>
    </section>
  );
}