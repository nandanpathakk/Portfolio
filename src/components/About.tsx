"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { aboutItems } from "@/data/about";
import { LucideIcon } from "lucide-react";

// ─── Card — hover effect applied either on mouse hover OR when scroll-focused ─

const Card = ({
    item,
    index,
    focused = false,
    className = "",
    cardRef,
}: {
    item: { title: string; description: string; icon: LucideIcon };
    index: number;
    focused?: boolean;
    className?: string;
    cardRef?: (el: HTMLDivElement | null) => void;
}) => (
    <div
        ref={cardRef}
        className={`relative overflow-hidden group p-6 md:p-8 bg-card/40 backdrop-blur-sm border transition-all duration-500 ${
            focused ? "border-primary/25" : "border-border hover:border-primary/25"
        } ${className}`}
    >
        {/* Amber left border — triggered by hover OR scroll focus */}
        <div
            className={`absolute left-0 top-0 bottom-0 w-0.5 bg-primary transform origin-bottom transition-transform duration-500 ${
                focused ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
            }`}
        />

        {/* Index number — decorative background */}
        <span className="absolute top-4 right-6 text-5xl font-bold text-border/60 font-display leading-none select-none pointer-events-none">
            0{index + 1}
        </span>

        <div className="relative z-10">
            {/* Icon */}
            <div
                className={`mb-5 p-3 rounded-lg w-fit transition-colors duration-300 ${
                    focused ? "bg-primary/10" : "bg-white/5 group-hover:bg-primary/10"
                }`}
            >
                <item.icon
                    className={`h-5 w-5 transition-colors duration-300 ${
                        focused ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    }`}
                />
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 leading-snug">
                {item.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {item.description}
            </p>
        </div>
    </div>
);

// ─── Mobile: horizontal scroll ────────────────────────────────────────────────

function MobileAbout() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-3 sm:gap-4 px-4 sm:px-6 items-center">
                    {/* Intro card */}
                    <div className="min-w-[88vw] sm:min-w-[85vw] h-[52vh] flex flex-col justify-center p-5 sm:p-6">
                        <p className="section-label mb-4">About</p>
                        <h2
                            className="text-4xl sm:text-5xl font-normal mb-5 leading-tight"
                            style={{ fontFamily: "var(--font-elegant), serif" }}
                        >
                            About<br /><em>Me.</em>
                        </h2>
                        <p className="text-base text-muted-foreground leading-relaxed font-light">
                            I like building things for the internet.
                        </p>
                    </div>
                    {/* Cards — no scroll focus on mobile horizontal scroll, hover only */}
                    {aboutItems.map((item, i) => (
                        <Card
                            key={i}
                            item={item}
                            index={i}
                            className="min-w-[88vw] sm:min-w-[85vw] h-[52vh] justify-end"
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ─── Desktop: sticky left + scroll-focused cards ──────────────────────────────

function DesktopAbout({ reducedMotion }: { reducedMotion: boolean | null }) {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (reducedMotion) return;

        const observers = cardRefs.current.map((ref, index) => {
            if (!ref) return null;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setFocusedIndex(index);
                    } else {
                        // Un-focus this card only if it was the focused one
                        setFocusedIndex((prev) => (prev === index ? -1 : prev));
                    }
                },
                // Card is "focused" when it occupies the center 30% of the viewport
                { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
            );
            observer.observe(ref);
            return observer;
        });

        return () => {
            observers.forEach((obs) => obs?.disconnect());
        };
    }, [reducedMotion]);

    return (
        <section className="py-24">
            <div className="px-6 md:px-10 lg:px-16">
                <div className="grid grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: sticky heading */}
                    <div className="sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: reducedMotion ? 0 : 0.6 }}
                        >
                            <p className="section-label mb-5">About</p>
                            <h2
                                className="text-5xl md:text-6xl lg:text-7xl font-normal leading-none mb-6"
                                style={{ fontFamily: "var(--font-elegant), serif" }}
                            >
                                About<br /><em>Me.</em>
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-xs">
                                I like building things for the internet.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: stacked cards with scroll-triggered focus */}
                    <div className="flex flex-col gap-3">
                        {aboutItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.08 }}
                            >
                                <Card
                                    item={item}
                                    index={i}
                                    focused={!reducedMotion && focusedIndex === i}
                                    cardRef={(el) => { cardRefs.current[i] = el; }}
                                />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function About() {
    const reducedMotion = useReducedMotion();

    return (
        <div id="about">
            {/* Mobile only */}
            <div className="block md:hidden">
                <MobileAbout />
            </div>
            {/* Desktop only */}
            <div className="hidden md:block">
                <DesktopAbout reducedMotion={reducedMotion} />
            </div>
        </div>
    );
}
