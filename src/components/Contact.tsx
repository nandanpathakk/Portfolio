"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LINKS } from "@/components/config/links";

export default function Contact() {
    const reducedMotion = useReducedMotion();

    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">

            {/* Giant ambient background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden -z-10">
                <span
                    className="font-normal leading-none text-border/20 opacity-60"
                    style={{
                        fontFamily: "var(--font-elegant), serif",
                        fontSize: "clamp(6rem, 28vw, 28rem)",
                    }}
                >
                    hello.
                </span>
            </div>

            <div className="px-6 md:px-10 lg:px-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reducedMotion ? 0 : 0.7 }}
                >
                    <p className="section-label mb-5">Contact</p>

                    <h2
                        className="text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.0] mb-10 md:mb-14 max-w-3xl"
                        style={{ fontFamily: "var(--font-elegant), serif" }}
                    >
                        Let&apos;s build<br />
                        something<br />
                        <em>great.</em>
                    </h2>

                    {/* Primary CTA — email as large text link */}
                    <motion.a
                        href={`mailto:${LINKS.EMAIL}`}
                        initial={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.15 }}
                        className="group inline-flex items-center gap-4 text-xl md:text-2xl lg:text-3xl text-muted-foreground hover:text-primary transition-colors duration-300 mb-12 md:mb-16"
                    >
                        <span className="border-b border-muted-foreground/30 group-hover:border-primary transition-colors duration-300 pb-1">
                            {LINKS.EMAIL}
                        </span>
                        <ArrowUpRight
                            size={24}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200 shrink-0"
                        />
                    </motion.a>

                    {/* Secondary social links */}
                    <div className="flex items-center gap-8 border-t border-border pt-8">
                        <a
                            href={LINKS.GITHUB}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            GitHub
                            <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </a>
                        <a
                            href={LINKS.LINKEDIN}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            LinkedIn
                            <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
