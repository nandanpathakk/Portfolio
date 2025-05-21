"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Skill = {
  name: string;
  logo: string;
};

type SkillCategoryKey = "Frontend" | "Backend" | "Tools & Others";

type SkillCategory = {
  [key in SkillCategoryKey]: Skill[];
};


export default function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>("Frontend");

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

  const skillCategories: SkillCategory = {
    Frontend: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/javascript" },
      { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "HTML", logo: "https://cdn.simpleicons.org/html5/html5" },
      { name: "CSS", logo: "https://cdn.simpleicons.org/css/css" },
      { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/0055FF" },
    ],
    Backend: [
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express", logo: "https://cdn.simpleicons.org/express/FFFFFF" },
      { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/postgresql" },
      { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma/prisma" },
    ],
    "Tools & Others": [
      { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
      { name: "Figma", logo: "https://cdn.simpleicons.org/figma/figma" },
      { name: "VS Code", logo: "https://cdn.simpleicons.org/devbox/007ACC" },
      { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/FFFFFF" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/docker" },

    ],
  };



  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen w-full bg-black text-white relative overflow-hidden"
    >
      {/* Cosmic background elements */}
      <div className="absolute inset-0 z-0">
        {/* Nebula effect */}
        <div
          className="absolute inset-0 opacity-20 bg-black"
        ></div>

        {/* Star-like particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-skill-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite alternate`,
            }}
          />
        ))}

        {/* Glowing orb for each category */}
        <motion.div
          className={`absolute rounded-full blur-3xl opacity-10 transition-all duration-700 bg-gradient-to-r from-cyan-500 to-blue-600`}
          animate={{
            x: ['0%', '5%', '0%', '-5%', '0%'],
            y: ['0%', '-5%', '0%', '5%', '0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: '30rem',
            height: '30rem',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
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
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Tech Stack
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Charting my technical constellation — the technologies I use to navigate
            the digital cosmos and bring ideas to life.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {(["Frontend", "Backend", "Tools & Others"] as SkillCategoryKey[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-lg transition-all ${activeCategory === category
                ? `bg-white/10 border border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-900/10`
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                }`}
            >
              <span className="capitalize">{category}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {skillCategories[activeCategory].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <div className={`w-16 h-16 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 mb-4 hover:border-cyan-400/30 transition-all duration-300 group`}>
                <div className="w-8 h-8 relative">
                  <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                </div>
              </div>
              <span className="text-white font-medium text-center">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="text-white/50 text-sm italic">Always exploring, always evolving — the journey continues</p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}