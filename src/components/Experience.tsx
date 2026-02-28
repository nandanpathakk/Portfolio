"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { useReducedMotion } from "framer-motion";

export default function Experience() {
    const reducedMotion = useReducedMotion();

    return (
        <section id="experience" className="py-24">
            <div className="px-6 md:px-10 lg:px-16">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reducedMotion ? 0 : 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <p className="section-label mb-5">Experience</p>
                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl font-normal leading-none"
                        style={{ fontFamily: "var(--font-elegant), serif" }}
                    >
                        Where I&apos;ve<br /><em>worked.</em>
                    </h2>
                </motion.div>

                {/* Timeline entries */}
                <div className="max-w-4xl">
                    {experienceData.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.1 }}
                            className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 border-t border-border py-8 md:py-12 hover:border-primary/40 transition-colors duration-500"
                        >
                            {/* Left: index + year */}
                            <div className="flex md:flex-col gap-4 md:gap-2 items-center md:items-start">
                                <span className="text-xs font-mono text-primary">0{i + 1}</span>
                                <span className="text-xs font-mono text-muted-foreground leading-relaxed">
                                    {exp.year}
                                </span>
                            </div>

                            {/* Right: role, company, description */}
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                                    {exp.role}
                                </h3>
                                <p className="text-muted-foreground mb-4 text-sm font-mono">
                                    {exp.company}
                                </p>
                                <p className="text-muted-foreground/70 text-sm leading-relaxed max-w-2xl">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Closing border */}
                    <div className="border-t border-border" />
                </div>
            </div>
        </section>
    );
}
