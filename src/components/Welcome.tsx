"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { LINKS } from "@/components/config/links";
import { Meteors } from "./ui/meteors";

export default function Welcome() {
    const [showHindi, setShowHindi] = useState(true);
    const [isGlitching, setIsGlitching] = useState(false);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!reducedMotion) setIsGlitching(true);
            setTimeout(() => {
                setShowHindi(false);
                setIsGlitching(false);
            }, reducedMotion ? 0 : 600);
        }, reducedMotion ? 0 : 2000);

        return () => clearTimeout(timer);
    }, [reducedMotion]);

    const nameSize = "clamp(3.2rem, 12vw, 11rem)";

    return (
        <section className="min-h-screen flex flex-col relative overflow-hidden">
            <Meteors />

            {/* Amber ambient glow */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-primary/4 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[400px] bg-primary/3 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>

            {/* Top metadata bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reducedMotion ? 0 : 0.3, duration: reducedMotion ? 0 : 0.8 }}
                className="flex items-center justify-between px-6 md:px-10 lg:px-16 pt-10 md:pt-14"
            >
                <span className="section-label">Portfolio · {new Date().getFullYear()}</span>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground/50">
                    Based in India
                </span>
            </motion.div>

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-10 md:py-16">

                {/*
                  Name container — stable height strategy:
                  A hidden "English 2-line" placeholder always drives the container height.
                  Both Hindi and English names are absolutely-positioned inside,
                  so switching between them causes zero layout shift.
                  overflow-visible so Devanagari top diacritics (anusvara dot in नंदन) are never clipped.
                */}
                <div className="relative mb-6 md:mb-8">

                    {/* Invisible height anchor — always sized to 2-line English name */}
                    <h1
                        aria-hidden="true"
                        className="invisible select-none pointer-events-none font-normal"
                        style={{
                            fontFamily: "var(--font-elegant), serif",
                            fontSize: nameSize,
                            lineHeight: "0.9",
                        }}
                    >
                        Nandan<br />Pathak
                    </h1>

                    {/* Animated names — overlay on top, absolutely positioned */}
                    <div className="absolute inset-0">
                        <AnimatePresence mode="wait">
                            {showHindi ? (
                                <motion.div
                                    key="hindi"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        x: isGlitching ? [0, -4, 4, -2, 2, -1, 1, 0] : 0,
                                        filter: isGlitching
                                            ? ["blur(0px)", "blur(1px)", "blur(3px)", "blur(1px)", "blur(0px)"]
                                            : "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        filter: reducedMotion ? "blur(0px)" : "blur(10px)",
                                        scale: reducedMotion ? 1 : 0.97,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        x: { duration: 0.6 },
                                        filter: { duration: 0.6 },
                                    }}
                                    className={`absolute inset-0 ${isGlitching && !reducedMotion ? "glitch" : ""}`}
                                    data-text="नंदन पाठक"
                                >
                                    <h1
                                        className="font-bold tracking-tight text-foreground"
                                        style={{
                                            fontFamily: "var(--font-teko), sans-serif",
                                            fontSize: nameSize,
                                            /*
                                              lineHeight >= 1.0 ensures the horizontal stroke (शिरोरेखा)
                                              and top diacritics (anusvara ं in नंदन) have room above them.
                                              paddingTop gives an explicit buffer so overflow:visible
                                              doesn't get cropped by any ancestor.
                                            */
                                            lineHeight: "1.0",
                                            paddingTop: "0.12em",
                                        }}
                                    >
                                        नंदन पाठक
                                    </h1>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="english"
                                    initial={{
                                        opacity: 0,
                                        filter: reducedMotion ? "blur(0px)" : "blur(10px)",
                                        scale: reducedMotion ? 1 : 0.97,
                                    }}
                                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                    transition={{ duration: reducedMotion ? 0 : 0.9, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    <h1
                                        className="font-normal tracking-tight"
                                        style={{
                                            fontFamily: "var(--font-elegant), serif",
                                            fontSize: nameSize,
                                            lineHeight: "0.9",
                                        }}
                                    >
                                        <span className="text-foreground">Nandan</span>
                                        <br />
                                        <em className="text-primary not-italic">Pathak</em>
                                    </h1>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Horizontal rule — draws in from left */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0 : 0.9, ease: "easeOut" }}
                    className="h-px bg-border mb-8 md:mb-10 origin-left"
                />

                {/* Bottom row: tagline + CTAs */}
                <div className="flex flex-col md:flex-row justify-between gap-8 md:items-end">

                    {/* Left: tagline + social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: reducedMotion ? 0 : 0.7, duration: reducedMotion ? 0 : 0.7 }}
                    >
                        <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xs leading-relaxed">
                            Developer.<br />
                            I build things that work.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href={LINKS.GITHUB}
                                target="_blank"
                                className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                GitHub
                            </a>
                            <a
                                href={LINKS.LINKEDIN}
                                target="_blank"
                                className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                LinkedIn
                            </a>
                            <a
                                href={`mailto:${LINKS.EMAIL}`}
                                className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                Email
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: reducedMotion ? 0 : 0.9, duration: reducedMotion ? 0 : 0.7 }}
                        className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0"
                    >
                        <a
                            href="#projects"
                            className="group w-full md:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-3 hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
                        >
                            View Work
                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </a>
                        <div className="flex gap-3 w-full md:w-auto">
                            <a
                                href={`mailto:${LINKS.EMAIL}`}
                                className="flex-1 justify-center group px-6 py-3.5 border border-border text-foreground font-medium text-sm flex items-center gap-3 hover:border-primary/60 hover:text-primary active:scale-[0.98] transition-all duration-200"
                            >
                                Contact
                            </a>
                            <a
                                href={LINKS.RESUME}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="View Resume"
                                className="flex-1 justify-center group px-6 py-3.5 border border-border bg-card/10 text-foreground font-medium text-sm flex items-center gap-2.5 hover:border-primary/60 hover:text-primary active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
                            >
                                Resume
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 group-hover:bg-primary animate-pulse" />
                                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reducedMotion ? 0 : 1.4, duration: 1 }}
                className="flex justify-center pb-8 md:pb-10"
            >
                <motion.div
                    animate={reducedMotion ? {} : { y: [0, 7, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="text-muted-foreground/30"
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
}
