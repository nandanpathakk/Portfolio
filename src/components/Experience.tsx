"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import Link from "next/link";

export default function Experience() {
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

    const experiences = [
        {
            id: 1,
            role: "Associate Software Developer",
            company: "Udaan IT Solutions",
            companyLink: "https://www.udaaannitsolutions.com",
            period: "June 2025 – Present",
            description: "Working on cross-platform applications using React.js and React Native. Involved in building features, optimizing user experience, and contributing to backend development with Node.js and Azure-powered services.",
            technologies: ["Next.js", "React.js","React Native", "TypeScript", "JavaScript", "Node.js", "MYSQL", ".NET", "Azure", "Tailwind CSS"]
        },
        {
            id: 2,
            role: "Full-Stack Developer Intern",
            company: "SHDPIXEL - Metamatrix",
            companyLink: "https://shdpixel.com/",
            period: "January 2025 – April 2025",
            description: "Worked on multiple web projects with a primary focus on frontend development. Built responsive and dynamic user interfaces, implemented UI/UX improvements, and collaborated on backend development tasks including API integration and server-side logic. Contributed to both design and performance optimization across the stack.",
            technologies: ["React.js", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Express", "MYSQL", "MongoDB"]
        }
    ];

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="min-h-screen w-full bg-black text-white relative overflow-hidden flex items-center justify-center py-20"
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
                        key={`star-exp-${i}`}
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
            </div>

            {/* Timeline connector */}
            <div className="absolute left-1/2 top-1/2 h-4/5 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

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
                    <h2 className="text-3xl md:text-4xl font-medium  mb-4">
                        Professional Journey
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Charting my course through the digital universe, each role expanding my capabilities
                        and vision for what technology can achieve.
                    </p>
                </motion.div>

                {/* Experience timeline */}
                <div className="relative space-y-12 md:space-y-24">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-4 md:gap-10`}
                        >
                            {/* Timeline node */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isVisible ? { scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                                className="w-10 h-10 rounded-full bg-black border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-900/20 z-10"
                            >
                                <Briefcase size={16} className="text-cyan-400" />
                            </motion.div>

                            {/* Content card */}
                            <motion.div
                                whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(34, 211, 238, 0.07)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 w-full md:w-[calc(100%-5rem)] hover:border-cyan-400/20 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <h3 className="text-xl font-medium text-white">{exp.role}</h3>
                                    <div className="flex items-center text-cyan-300/80 mt-2 md:mt-0">
                                        <Calendar size={14} className="mr-2" />
                                        <span className="text-sm">{exp.period}</span>
                                    </div>
                                </div>
                                <Link href={exp.companyLink} target="_blank" rel="noopener noreferrer">
                                    <p className="text-white/70 mb-6 underline">{exp.company}</p>
                                </Link>
                                <p className="text-white/80 mb-6">{exp.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-cyan-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
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