"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { projectsData } from "@/data/projects";

export default function Projects() {
    const reducedMotion = useReducedMotion();

    return (
        <section id="projects" className="py-24">
            <div className="px-6 md:px-10 lg:px-16">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reducedMotion ? 0 : 0.6 }}
                    className="mb-4"
                >
                    <p className="section-label mb-5">Work</p>
                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl font-normal leading-none mb-4"
                        style={{ fontFamily: "var(--font-elegant), serif" }}
                    >
                        Selected<br /><em>projects.</em>
                    </h2>
                    <p className="text-muted-foreground/60 italic text-sm mb-16">
                        There&apos;s more, just not here yet. Patience is a virtue, apparently
                    </p>
                </motion.div>

                {/* Project grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl">
                    {projectsData.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : i * 0.08 }}
                            className="group relative overflow-hidden bg-card/30 border border-border hover:border-primary/30 transition-colors duration-500"
                        >
                            {/* Project number — large decorative */}
                            <span
                                className="absolute -top-3 right-4 text-[6rem] font-bold leading-none text-border/50 select-none pointer-events-none z-0"
                                style={{ fontFamily: "var(--font-elegant), serif" }}
                            >
                                0{i + 1}
                            </span>

                            {/* Image */}
                            <div className="h-44 sm:h-48 relative overflow-hidden bg-card z-10">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-5 md:p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-1 shrink-0 ml-2">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            aria-label="View source code"
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                                        >
                                            <Github className="w-4 h-4" />
                                        </a>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            aria-label="View live project"
                                            className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-0.5 text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
