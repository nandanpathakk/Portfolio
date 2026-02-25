"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { LINKS } from "@/components/config/links";

export default function Contact() {
    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-primary">
                        Let&apos;s Work Together
                    </h2>

                    <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-12 text-center">
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Have a project in mind, a question, or just want to say hi?
                            My inbox is always open.
                        </p>

                        {/* Primary CTA */}
                        <a
                            href={`mailto:${LINKS.EMAIL}`}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium rounded-2xl hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_8px_32px_rgba(255,255,255,0.08)] mb-8 group"
                        >
                            <Mail size={18} />
                            {LINKS.EMAIL}
                            <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                        </a>

                        {/* Secondary Links */}
                        <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
                            <a
                                href={LINKS.GITHUB}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                            >
                                <Github size={16} />
                                GitHub
                            </a>
                            <a
                                href={LINKS.LINKEDIN}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                            >
                                <Linkedin size={16} />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
