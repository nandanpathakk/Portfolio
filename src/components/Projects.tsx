"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { Project } from "@/types";

function ProjectMediaCarousel({ project }: { project: Project }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const media = project.media;

    if (!media || media.length === 0) {
        return (
            <div className="h-44 sm:h-48 relative overflow-hidden bg-card z-10">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none" />
            </div>
        );
    }

    const next = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    const prev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    return (
        <div className="h-44 sm:h-48 relative bg-card z-10 group/carousel overflow-hidden rounded-t-xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10"
                >
                    {/* Blurred background for premium aspect ratio filling */}
                    {media[currentIndex].type === 'video' ? (
                        <video
                            src={media[currentIndex].url}
                            loop
                            muted
                            autoPlay
                            playsInline
                            className="absolute inset-0 object-cover w-full h-full blur-xl opacity-30 scale-110 pointer-events-none"
                        />
                    ) : (
                        <Image
                            src={media[currentIndex].url}
                            alt=""
                            fill
                            className="absolute inset-0 object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                        />
                    )}

                    {/* Foreground contained asset */}
                    <div className="absolute inset-0 z-10">
                        {media[currentIndex].type === 'video' ? (
                            <video
                                src={media[currentIndex].url}
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="object-contain w-full h-full drop-shadow-2xl"
                            />
                        ) : (
                            <Image
                                src={media[currentIndex].url}
                                alt={`${project.title} media ${currentIndex + 1}`}
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {media.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-black/80 backdrop-blur-sm"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-black/80 backdrop-blur-sm"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                        {media.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setCurrentIndex(idx);
                                }}
                                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex ? "bg-white w-3" : "bg-white/50"}`}
                            />
                        ))}
                    </div>
                </>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent pointer-events-none z-10" />
        </div>
    );
}

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
                            className="group relative overflow-hidden bg-card/30 border border-border hover:border-primary/30 transition-colors duration-500 rounded-xl"
                        >
                            {/* Project number — large decorative */}
                            <span
                                className="absolute -top-3 right-4 text-[6rem] font-bold leading-none text-border/50 select-none pointer-events-none z-0"
                                style={{ fontFamily: "var(--font-elegant), serif" }}
                            >
                                0{i + 1}
                            </span>

                            <ProjectMediaCarousel project={project} />

                            {/* Content */}
                            <div className="relative z-10 p-5 md:p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        {project.comingSoon && (
                                            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.16em] rounded-full border border-amber-400/40 bg-amber-500/10 text-amber-200">
                                                Coming soon
                                            </span>
                                        )}
                                    </div>
                                    {!project.comingSoon && (
                                        <div className="flex gap-2 shrink-0 ml-2 relative z-20">
                                            {/* Single Github Link */}
                                            {typeof project.github === "string" && project.github !== "#" && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    aria-label="View source code"
                                                    className="p-2 flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}

                                            {/* Multiple Github Links */}
                                            {Array.isArray(project.github) && project.github.map((gh, idx) => (
                                                <a
                                                    key={idx}
                                                    href={gh.url}
                                                    target="_blank"
                                                    aria-label={`View ${gh.label} source code`}
                                                    className="flex items-center gap-1.5 py-2 px-1.5 text-muted-foreground hover:text-primary transition-all duration-200 group/gh"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 group-hover/gh:opacity-100 transition-opacity">
                                                        {gh.label}
                                                    </span>
                                                </a>
                                            ))}

                                            {project.link && project.link !== "#" && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    aria-label="View live project"
                                                    className="p-2 ml-1 flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                                                >
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    )}
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
