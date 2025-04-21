"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Explorer() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [particleEffects, setParticleEffects] = useState(false);

    // Play a subtle sound effect
    const playSelectSound = () => {
        const audio = new Audio("/sounds/node-activate.mp3");
        audio.volume = 0.2;
        audio.play().catch((e) => console.log("Audio play failed:", e));
    };

    // Scroll to next section
    const scrollToNextSection = () => {
        const nextSection = document.getElementById("projects");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Toggle interactive element
    const toggleSection = (id: string) => {
        setActiveSection(activeSection === id ? null : id);
        if (id === "discover") {
            setParticleEffects(activeSection !== "discover");
        }
        playSelectSound();
    };

    return (
        <section className="min-h-screen w-full bg-black text-cyan-100 font-sans relative overflow-hidden flex items-center justify-center">
            {/* Star background */}
            <div className="absolute inset-0 z-0">
                {Array.from({ length: 70 }).map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.3,
                            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
                        }}
                    />
                ))}
            </div>

            {/* Main container */}
            <div className="max-w-5xl w-full mx-auto px-6 py-16 relative z-10 flex flex-col items-center">
                <div className="flex flex-col items-center text-center max-w-2xl">
                    {/* Profile image and name section */}
                    <motion.div
                        className="mb-8 flex flex-col items-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-cyan-400/30 mb-6 shadow-lg shadow-cyan-400/20">
                            <Image
                                src="/images/main1.jpg"
                                alt="Nandan"
                                className="w-full h-full object-cover"
                                width={128}
                                height={128}
                                priority
                            />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-light italic text-cyan-100 tracking-tight mb-2">
                            Hello, I'm Nandan
                        </h1>
                        {/* <p className="text-sm md:text-base text-cyan-300/70 font-mono">
              — developer
            </p> */}
                    </motion.div>

                    {/* Introduction text */}
                    <motion.div
                        className="mb-12 text-base md:text-lg text-cyan-100/90 space-y-4 font-mono text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <p>
                            I'm a <span className="font-medium text-cyan-300">frontend-focused full-stack developer</span> passionate about crafting smooth, performant, and interactive web experiences.
                        </p>

                        <p>
                            I enjoy working with <span className="font-medium text-cyan-300">modern JavaScript frameworks</span>, exploring <span className="font-medium text-cyan-300">UI/UX best practices</span>, and building scalable applications.
                        </p>

                        <p>
                            Currently, I'm diving deeper into <span className="font-medium text-cyan-300">React, TypeScript, and backend integrations</span> while working on projects and contributing to open source.
                        </p>

                        <p>
                            This space is where I share my learnings, experiments, and thoughts as I grow in the field.
                        </p>
                    </motion.div>


                    {/* Interactive digital anomaly element */}
                    <motion.div
                        className="w-full max-w-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <button
                            onClick={() => toggleSection("discover")}
                            className={`w-full py-4 px-6 rounded-xl text-center transition-all backdrop-blur-sm ${activeSection === "discover"
                                    ? "bg-cyan-900/30 text-cyan-100 shadow-lg shadow-cyan-500/10 border border-cyan-500/20"
                                    : "bg-cyan-900/20 text-cyan-300/80 hover:bg-cyan-900/25 border border-cyan-500/10"
                                }`}
                        >
                            <span className="text-base font-mono font-medium">Initiate Neural Interface</span>
                        </button>

                        {/* Digital particles effect */}
                        <AnimatePresence>
                            {particleEffects && (
                                <motion.div
                                    className="absolute inset-0 z-0 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <motion.div
                                            key={`particle-${i}`}
                                            className="absolute w-1 h-1 rounded-full bg-cyan-400"
                                            initial={{
                                                x: 0,
                                                y: 0,
                                                opacity: 0
                                            }}
                                            animate={{
                                                x: Math.random() * 600 - 300,
                                                y: Math.random() * 600 - 300,
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 2 + Math.random() * 2,
                                                repeat: Infinity,
                                                repeatType: "loop",
                                                delay: Math.random() * 2
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Expandable content */}
                        <AnimatePresence>
                            {activeSection === "discover" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 bg-cyan-900/20 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-left relative overflow-hidden">
                                        {/* Digital interface elements */}
                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

                                        <h3 className="text-lg font-mono font-medium text-cyan-300 mb-4">Digital Signature Analysis</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
                                            <motion.div
                                                className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-500/20"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-mono font-medium text-cyan-200">Primary Protocol</h4>
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                                </div>
                                                <p className="text-sm text-cyan-100/70 font-mono">Building web3 applications with a focus on user experience</p>
                                            </motion.div>

                                            <motion.div
                                                className="bg-cyan-900/30 rounded-lg p-4 border border-cyan-500/20"
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-mono font-medium text-cyan-200">Subspace Query</h4>
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                                </div>
                                                <p className="text-sm text-cyan-100/70 font-mono">Exploring the intersection of AI, blockchain, and creative coding</p>
                                            </motion.div>
                                        </div>

                                        <motion.div
                                            className="w-full h-24 mt-4 rounded-lg overflow-hidden relative"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="waveform-container w-full h-12 overflow-hidden">
                                                    {Array.from({ length: 50 }).map((_, i) => (
                                                        <motion.div
                                                            key={`wave-${i}`}
                                                            className="inline-block w-1 mx-0.5 bg-cyan-400/70"
                                                            initial={{ height: 4 }}
                                                            animate={{
                                                                height: [
                                                                    4 + Math.random() * 8,
                                                                    12 + Math.random() * 20,
                                                                    4 + Math.random() * 8
                                                                ]
                                                            }}
                                                            transition={{
                                                                duration: 1.2,
                                                                repeat: Infinity,
                                                                repeatType: "reverse",
                                                                delay: i * 0.03
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full text-center pb-2">
                                                <span className="text-xs font-mono text-cyan-300/80">Digital signature validated</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>


                    {/* Social links */}
                    {/* <motion.div 
            className="mt-10 bg-cyan-900/20 backdrop-blur-sm rounded-full p-2 inline-flex items-center space-x-2 border border-cyan-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a href="#" className="p-2 text-cyan-300/70 hover:text-cyan-300 transition-colors" aria-label="Home">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </a>
            <a href="#" className="p-2 text-cyan-300/70 hover:text-cyan-300 transition-colors" aria-label="Resume">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </a>
            <a href="#" className="p-2 text-cyan-300/70 hover:text-cyan-300 transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 text-cyan-300/70 hover:text-cyan-300 transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 text-cyan-300/70 hover:text-cyan-300 transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </motion.div> */}
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 1, 0.5],
                        y: [0, 10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    onClick={scrollToNextSection}
                >
                    {/* <p className="text-xs font-mono text-cyan-300/50 mb-2">Projects</p> */}
                    <ChevronDown className="w-5 h-5 text-cyan-300/70" />
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.3; transform: scale(1); }
        }
      `}</style>
        </section>
    );
}