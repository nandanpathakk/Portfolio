"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { aboutItems } from "@/data/about";
import { LucideIcon } from "lucide-react";

// ─── Shared card used by both layouts ────────────────────────────────────────

const Card = ({
    item,
    className = "",
}: {
    item: { title: string; description: string; icon: LucideIcon };
    className?: string;
}) => (
    <div
        className={`p-6 md:p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 flex flex-col hover:border-white/20 transition-colors duration-300 group ${className}`}
    >
        <div className="mb-4 p-3 rounded-2xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
            <item.icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{item.title}</h3>
        <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">
            {item.description}
        </p>
    </div>
);

// ─── Mobile: original horizontal scroll ──────────────────────────────────────

function MobileAbout() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-3 sm:gap-4 px-3 sm:px-4 items-center">
                    {/* Intro text */}
                    <div className="min-w-[88vw] sm:min-w-[85vw] h-[50vh] flex flex-col justify-center p-5 sm:p-6 rounded-3xl bg-transparent">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white tracking-tighter">
                            About Me
                        </h2>
                        <p className="text-base sm:text-xl text-neutral-400 leading-relaxed font-light">
                            I like building things for the internet.
                        </p>
                    </div>
                    {/* Cards */}
                    {aboutItems.map((item, i) => (
                        <Card key={i} item={item} className="min-w-[88vw] sm:min-w-[85vw] h-[50vh] justify-end" />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ─── Desktop: sticky left + vertical cards ───────────────────────────────────

function DesktopAbout({ reducedMotion }: { reducedMotion: boolean | null }) {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 gap-8 lg:gap-16 items-start">

                    {/* Left: sticky heading */}
                    <div className="sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: reducedMotion ? 0 : 0.6 }}
                        >
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
                                About Me
                            </h2>
                            <p className="text-base md:text-xl text-neutral-400 leading-relaxed font-light">
                                I like building things for the internet.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: stacked cards */}
                    <div className="flex flex-col gap-6">
                        {aboutItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.08 }}
                            >
                                <Card item={item} />
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
