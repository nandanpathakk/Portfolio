"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    ArrowUp,
    Cpu
} from "lucide-react";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer
            ref={footerRef}
            className="w-full bg-black text-white relative overflow-hidden pt-16"
        >
            {/* Cosmic background elements */}
            <div className="absolute inset-0 z-0">
                {/* Star-like particles */}
                {Array.from({ length: 70 }).map((_, i) => (
                    <div
                        key={`star-footer-${i}`}
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

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
            </div>

            {/* Digital circuit paths in background */}
            <div className="absolute inset-0 z-0 opacity-20">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={`circuit-footer-${i}`}
                        className="absolute bg-cyan-400 opacity-30"
                        style={{
                            height: "1px",
                            width: `${Math.random() * 30 + 10}%`,
                            top: `${(100 / 5) * i + Math.random() * 10}%`,
                            left: `${Math.random() * 70}%`,
                            boxShadow: "0 0 8px #22d3ee",
                        }}
                    />
                ))}
            </div>

            {/* Main footer content */}
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Column 1: About */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-light italic text-white mb-4 flex items-center">
                            <Cpu size={18} className="mr-2 text-cyan-400" />
                            Nandan Pathak
                        </h3>
                        <p className="text-white/70 text-sm">
                            Frontend-focused full-stack developer passionate about building interactive
                            and performant web experiences with modern technologies.
                        </p>
                        <div className="pt-4">
                            <p className="text-white/70 text-sm">
                                Based in India
                            </p>
                            <a
                                href="mailto:nandanpathak30@gmail.com"
                                className="text-cyan-300 hover:text-cyan-200 transition-colors text-sm flex items-center mt-2"
                            >
                                <Mail size={14} className="mr-2" />
                                nandanpathak30@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-light italic text-white mb-4">Navigation</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#home" className="text-white/70 hover:text-cyan-300 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="#skills" className="text-white/70 hover:text-cyan-300 transition-colors">
                                    Skills
                                </Link>
                            </li>
                            <li>
                                <Link href="#experience" className="text-white/70 hover:text-cyan-300 transition-colors">
                                    Experience
                                </Link>
                            </li>
                            <li>
                                <Link href="#projects" className="text-white/70 hover:text-cyan-300 transition-colors">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-white/70 hover:text-cyan-300 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-light italic text-white mb-4">Connect</h3>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://github.com/nandanpathakk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
                                aria-label="GitHub"
                            >
                                <Github size={20} className="text-white/70 group-hover:text-cyan-300 transition-colors" />
                            </a>
                            <a
                                href="www.linkedin.com/in/nandan-pathak-63211a234"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} className="text-white/70 group-hover:text-cyan-300 transition-colors" />
                            </a>
                            <a
                                href="https://x.com/nandanpathakk?s=21"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} className="text-white/70 group-hover:text-cyan-300 transition-colors" />
                            </a>
                            {/* <a
                                href="/assets/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
                                aria-label="Resume"
                            >
                                <FileText size={20} className="text-white/70 group-hover:text-cyan-300 transition-colors" />
                            </a> */}
                            <a
                                href="mailto:nandanpathak30@gmail.com"
                                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all group"
                                aria-label="Email"
                            >
                                <Mail size={20} className="text-white/70 group-hover:text-cyan-300 transition-colors" />
                            </a>
                        </div>

                        <div className="pt-6">
                            <button
                                onClick={scrollToTop}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-400/50 transition-all group"
                            >
                                <ArrowUp size={16} className="text-white/70 group-hover:text-cyan-300 transition-colors" />
                                <span className="text-white/70 group-hover:text-cyan-300 transition-colors text-sm">Back to top</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                ></motion.div>

                {/* Copyright */}
                <motion.div
                    className="text-center text-white/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    {/* <p>© {new Date().getFullYear()} Nandan. All rights reserved.</p> */}
                    <p className="my-8 text-white/40">
                        Made with ❤️ By Nandan Pathak
                    </p>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
          100% { opacity: 0.2; transform: scale(1); }
        }
      `}</style>
        </footer>
    );
}