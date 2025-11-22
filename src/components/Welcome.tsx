"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { LINKS } from "@/components/config/links";

export default function Welcome() {
    const [showHindi, setShowHindi] = useState(true);
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        // Show Hindi for 2 seconds, then glitch and switch to English
        const timer = setTimeout(() => {
            setIsGlitching(true);

            // Play glitch sound
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3");
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed (user interaction needed first):", e));

            setTimeout(() => {
                setShowHindi(false);
                setIsGlitching(false);
            }, 600); // Glitch duration
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center max-w-4xl mx-auto"
                >
                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-base md:text-xl text-muted-foreground mb-4 font-light tracking-wide"
                    >
                        Hey there 👋, I&apos;m
                    </motion.p>

                    {/* Name with Hindi to English morph */}
                    <div className="relative h-[80px] sm:h-[120px] md:h-[180px] lg:h-[220px] flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            {showHindi ? (
                                <motion.h1
                                    key="hindi"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        x: isGlitching ? [0, -3, 3, -2, 2, -1, 1, 0] : 0,
                                        filter: isGlitching ? [
                                            "blur(0px) hue-rotate(0deg)",
                                            "blur(1px) hue-rotate(0deg)",
                                            "blur(3px) hue-rotate(0deg)",
                                            "blur(1px) hue-rotate(0deg)",
                                            "blur(2px) hue-rotate(0deg)",
                                            "blur(0px) hue-rotate(0deg)"
                                        ] : "blur(0px) hue-rotate(0deg)",
                                        scale: isGlitching ? [1, 1.02, 0.98, 1.01, 0.99, 1] : 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                        filter: "blur(10px)"
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        x: { duration: 0.6, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] },
                                        filter: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
                                        scale: { duration: 0.6, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
                                    }}
                                    className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none absolute ${isGlitching ? 'glitch' : ''}`}
                                    style={{ fontFamily: "'teko', cursive" }}
                                >
                                    नंदन पाठक
                                </motion.h1>
                            ) : (
                                <motion.h1
                                    key="english"
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                        filter: "blur(10px)"
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: "blur(0px)"
                                    }}
                                    transition={{ duration: 0.8 }}
                                    className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none absolute"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    Nandan Pathak
                                </motion.h1>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Description with backend mention */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        A developer with a passion for clean code and minimal design.
                        <br />
                        <span className="text-muted-foreground/60 text-sm">
                            (Of course I do backend as well 😌)
                        </span>
                    </motion.p>

                    {/* Dual-Message Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 font-light leading-relaxed">

                        <span className="text-muted-foreground/30">Making it </span>
                        <span className="text-white font-semibold">work</span>
                        <span className="text-muted-foreground/30">, Making it </span>
                        <span className="text-white font-semibold">right</span>
                        <span className="text-muted-foreground/30">, Making it </span>
                        <span className="text-white font-semibold">fast</span>
                    </motion.p>

                    {/* iOS-Style CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12"
                    >
                        {/* Primary iOS Button */}
                        <a
                            href="#projects"
                            className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium rounded-2xl overflow-hidden transition-all hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-2">
                                View My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        {/* Secondary iOS Button */}
                        <a
                            href={`mailto:${LINKS.EMAIL}`}
                            target="_blank"
                            className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-medium rounded-2xl overflow-hidden transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative">Let&apos;s Connect</span>
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="flex items-center justify-center gap-6 text-muted-foreground"
                    >
                        <a
                            href={LINKS.GITHUB}
                            target="_blank"
                            className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 transform duration-200"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={LINKS.LINKEDIN}
                            target="_blank"
                            className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 transform duration-200"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href={`mailto:${LINKS.EMAIL}`}
                            target="_blank"
                            className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110 transform duration-200"
                        >
                            <Mail size={20} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}