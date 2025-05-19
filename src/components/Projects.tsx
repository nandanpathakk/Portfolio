"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Globe } from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
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

  // Project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "ChatBox - Real time chat application",
      description: "A chat web app with real-time messaging, secure Google Authentication for user login, and a friend request system with responsive UI for seamless use across devices",
      image: "/images/Chatbox.webp",
      type: "Fullstack",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS","Redis", "Google authentication"],
      liveUrl: "https://chatbox-gamma-teal.vercel.app",
      githubUrl: "https://github.com/nandanpathakk/Real-time-chat-app",
      featured: true
    },
    {
      id: 2,
      title: "CodeCrew - web collaborative IDE",
      description: "A collaborative IDE where users can join rooms to code together in real-time.",
      image: "/images/codeCrew.webp", 
      type: "Ongoing",
      technologies: ["Next.js", "Typescript", "Tailwind CSS", "Express.js", "Socket.io", "Node.js"],
      liveUrl: "",
      githubUrl: "",
      featured: true
    },
    {
      id: 3,
      title: "AI Note-Taking Application",
      description: "Take notes seamlessly, and summarize or generate content instantly with AI.",
      image: "/images/Note.png",
      type: "Fullstack",
      technologies: ["Next.js", "Supabase", "Typescript", "Tailwind CSS"],
      liveUrl: "https://note-task-app-omega.vercel.app/login",
      githubUrl: "https://github.com/nandanpathakk/Note-Task-App",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio",
      description: "This Animated Portfolio",
      image: "/images/Portfolio.png",
      type: "Frontend",
      technologies: ["Next.js","TypeScript","Tailwind CSS", "Framer Motion"],
      liveUrl: "",
      githubUrl: "https://github.com/nandanpathakk/Portfolio",
      featured: false
    },
    {
      id: 5,
      title: "Frontend Component Library",
      description: "A reusable and scalable UI component library featuring modular components and responsive design for seamless integration into projects.",
      image: "/images/Frontend_Library.png",
      type: "Comming Soon",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
      liveUrl: "",
      githubUrl: "",
      featured: false
    }
  ];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : activeFilter === "featured"
      ? projects.filter(project => project.featured)
      : projects.filter(project => project.type === activeFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen w-full bg-black text-white relative overflow-hidden py-20"
    >
      {/* Cosmic background elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid effect */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`grid-x-${i}`}
              className="absolute h-px w-full bg-cyan-400/30"
              style={{ top: `${(i + 1) * 10}%` }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`grid-y-${i}`}
              className="absolute w-px h-full bg-cyan-400/30"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>

        {/* Glowing orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(76, 29, 149, 0.4) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Main content container */}
      <motion.div
        className="max-w-6xl w-full mx-auto px-6 relative z-10"
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
            Featured Projects
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A collection of my digital constellations — each project a testament to my exploration
            of code, design, and problem-solving.
          </p>
        </motion.div>

        {/* Project filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {["all", "featured", "frontend", "fullstack"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-lg transition-all ${
                activeFilter === filter
                  ? "bg-white/10 border border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-900/10"
                  : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
              }`}
            >
              <span className="capitalize">{filter}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 50, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-900/10 transition-all group"
            >
              {/* Project image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="object-fill w-full h-full group-hover:scale-105 transition-transform duration-500"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between p-4">
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
                      >
                        <Globe size={16} className="text-white" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors"
                      >
                        <Github size={16} className="text-white" />
                      </a>
                    )}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-cyan-500/80 backdrop-blur-sm text-xs text-white">
                    {project.type}
                  </div>
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-cyan-200">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}