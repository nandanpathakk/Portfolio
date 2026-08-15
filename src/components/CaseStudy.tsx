"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { LINKS } from "@/components/config/links";

export default function CaseStudy({ project }: { project: Project }) {
    const reducedMotion = useReducedMotion();
    const details = project.details!;
    const media = details.media ?? project.media;

    const fadeIn = {
        initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: reducedMotion ? 0 : 0.6 },
    };

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
            <div className="px-6 md:px-10 lg:px-16 pt-10 md:pt-14 pb-24">

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reducedMotion ? 0 : 0.5 }}
                >
                    <Link
                        href="/#projects"
                        className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
                        All projects
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1 }}
                    className="mt-16 md:mt-24 mb-16 md:mb-20"
                >
                    <p className="section-label mb-6">Case study</p>
                    <h1
                        className="font-normal leading-none mb-8"
                        style={{
                            fontFamily: "var(--font-elegant), serif",
                            fontSize: "clamp(3.5rem, 10vw, 9rem)",
                        }}
                    >
                        <em>{project.title}.</em>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
                        {details.tagline}
                    </p>
                </motion.header>

                {/* Fact grid */}
                <motion.div
                    {...fadeIn}
                    className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 border-t border-border pt-8 mb-20 md:mb-28 max-w-5xl"
                >
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">Year</p>
                        <p className="text-sm text-muted-foreground">{details.year}</p>
                    </div>
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">Role</p>
                        <p className="text-sm text-muted-foreground">{details.role}</p>
                    </div>
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">Status</p>
                        <p className="text-sm text-muted-foreground">{details.status}</p>
                    </div>
                    <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">Stack</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {details.stack.join(", ")}
                        </p>
                    </div>
                </motion.div>

                {/* Try it — only for projects that ship something installable */}
                {project.download && (
                    <motion.section {...fadeIn} className="border-t border-border py-10 md:py-14 max-w-5xl">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-8">Try it</p>

                        <div className="rounded-xl border border-border bg-card/30 p-6 md:p-8">
                            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                                <div className="max-w-md">
                                    <h2
                                        className="text-2xl md:text-3xl font-normal leading-snug mb-4"
                                        style={{ fontFamily: "var(--font-elegant), serif" }}
                                    >
                                        Put it on your <em>phone.</em>
                                    </h2>
                                    {project.download.note && (
                                        <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed">
                                            {project.download.note}
                                        </p>
                                    )}
                                </div>

                                <div className="shrink-0 flex flex-col gap-3 md:items-end">
                                    <a
                                        href={project.download.url}
                                        className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-[0.2em] hover:bg-primary/20 hover:border-primary/50 transition-colors duration-300"
                                    >
                                        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                                        Download APK
                                    </a>
                                    {project.download.meta && (
                                        <p className="text-[11px] font-mono text-muted-foreground/60">
                                            {project.download.meta}
                                        </p>
                                    )}
                                    {project.download.releaseUrl && (
                                        <a
                                            href={project.download.releaseUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors duration-200"
                                        >
                                            Release notes
                                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {project.download.steps && project.download.steps.length > 0 && (
                                <ol className="mt-8 pt-8 border-t border-border grid gap-5 sm:grid-cols-3">
                                    {project.download.steps.map((step, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="text-xs font-mono text-primary shrink-0 leading-relaxed">
                                                0{i + 1}
                                            </span>
                                            <span className="text-sm text-muted-foreground/70 leading-relaxed">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    </motion.section>
                )}

                {/* Try it — for anything hosted, where the whole install step is a link */}
                {project.tryIt && (
                    <motion.section {...fadeIn} className="border-t border-border py-10 md:py-14 max-w-5xl">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-8">Try it</p>

                        <div className="rounded-xl border border-border bg-card/30 p-6 md:p-8">
                            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                                <div className="max-w-md">
                                    <h2
                                        className="text-2xl md:text-3xl font-normal leading-snug mb-4"
                                        style={{ fontFamily: "var(--font-elegant), serif" }}
                                    >
                                        <em>{project.tryIt.heading}</em>
                                    </h2>
                                    {project.tryIt.note && (
                                        <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed">
                                            {project.tryIt.note}
                                        </p>
                                    )}
                                </div>

                                <div className="shrink-0 flex flex-col gap-3 md:items-end">
                                    <a
                                        href={project.tryIt.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-[0.2em] hover:bg-primary/20 hover:border-primary/50 transition-colors duration-300"
                                    >
                                        {project.tryIt.label}
                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                    </a>
                                    {project.tryIt.meta && (
                                        <p className="text-[11px] font-mono text-muted-foreground/60">
                                            {project.tryIt.meta}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {project.tryIt.steps && project.tryIt.steps.length > 0 && (
                                <ol className="mt-8 pt-8 border-t border-border grid gap-5 sm:grid-cols-3">
                                    {project.tryIt.steps.map((step, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="text-xs font-mono text-primary shrink-0 leading-relaxed">
                                                0{i + 1}
                                            </span>
                                            <span className="text-sm text-muted-foreground/70 leading-relaxed">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    </motion.section>
                )}

                {/* Overview */}
                <motion.section
                    {...fadeIn}
                    className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 border-t border-border py-10 md:py-14 max-w-5xl"
                >
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Overview</p>
                    <div className="space-y-5 max-w-2xl">
                        {details.overview.map((paragraph, i) => (
                            <p key={i} className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </motion.section>

                {/* Media gallery */}
                {media && media.length > 0 && (
                    <motion.section {...fadeIn} className="border-t border-border py-10 md:py-14 max-w-5xl">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-8">Screens</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                            {media.map((item, i) => (
                                <figure
                                    key={i}
                                    className="relative overflow-hidden rounded-xl border border-border bg-card/30"
                                >
                                    <div className="relative aspect-video">
                                        {item.type === "video" ? (
                                            <video
                                                src={item.url}
                                                loop
                                                muted
                                                autoPlay
                                                playsInline
                                                controls
                                                className="absolute inset-0 w-full h-full object-contain"
                                            />
                                        ) : (
                                            <Image
                                                src={item.url}
                                                alt={item.caption ?? `${project.title} screen ${i + 1}`}
                                                fill
                                                className="object-contain"
                                            />
                                        )}
                                    </div>
                                    {item.caption && (
                                        <figcaption className="px-4 py-3 text-xs font-mono text-muted-foreground border-t border-border">
                                            {item.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Research & decision sections */}
                {details.sections.map((section, i) => (
                    <motion.section
                        key={i}
                        {...fadeIn}
                        className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 border-t border-border py-10 md:py-14 max-w-5xl"
                    >
                        <div className="flex md:flex-col gap-4 md:gap-2 items-center md:items-start">
                            <span className="text-xs font-mono text-primary">0{i + 1}</span>
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                                {section.label}
                            </span>
                        </div>
                        <div className="max-w-2xl">
                            <h2
                                className="text-2xl md:text-3xl font-normal leading-snug mb-6"
                                style={{ fontFamily: "var(--font-elegant), serif" }}
                            >
                                {section.title}
                            </h2>
                            <div className="space-y-5">
                                {section.body.map((paragraph, idx) => (
                                    <p key={idx} className="text-muted-foreground/80 text-sm md:text-base leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                            {section.bullets && section.bullets.length > 0 && (
                                <ul className="mt-6 space-y-2.5">
                                    {section.bullets.map((bullet, idx) => (
                                        <li
                                            key={idx}
                                            className="flex gap-3 text-sm leading-relaxed text-muted-foreground/70"
                                        >
                                            <span className="text-primary/60 font-mono select-none shrink-0 leading-relaxed">—</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.section>
                ))}

                {/* Footer CTA */}
                <motion.div
                    {...fadeIn}
                    className="border-t border-border pt-14 md:pt-20 max-w-5xl flex flex-col md:flex-row md:items-end justify-between gap-10"
                >
                    <div>
                        <p className="section-label mb-5">Next</p>
                        <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-6">
                            Curious about the details, the code, or how this thinking would apply to your team&apos;s product?
                        </p>
                        <a
                            href={`mailto:${LINKS.EMAIL}`}
                            className="group inline-flex items-center gap-2 text-lg md:text-xl text-foreground hover:text-primary transition-colors duration-300"
                            style={{ fontFamily: "var(--font-elegant), serif" }}
                        >
                            <em>Let&apos;s talk.</em>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        {project.tryIt && (
                            <a
                                href={project.tryIt.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                <ArrowUpRight className="w-4 h-4" /> Live
                            </a>
                        )}
                        {project.download && (
                            <a
                                href={project.download.url}
                                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                <Download className="w-4 h-4" /> Download
                            </a>
                        )}
                        {typeof project.github === "string" && project.github !== "#" && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                <Github className="w-4 h-4" /> Source
                            </a>
                        )}
                        <Link
                            href="/#projects"
                            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
                            All projects
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
