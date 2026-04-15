"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LINKS } from "@/components/config/links";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
];

export default function Nav() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ y: -64, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -64, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
                >
                    <div className="px-6 md:px-10 lg:px-16 h-14 flex items-center justify-between">
                        {/* Logo */}
                        <a
                            href="#"
                            className="text-sm font-mono text-foreground hover:text-primary transition-colors duration-200"
                        >
                            np.
                        </a>

                        {/* Nav Links with animated amber underlines */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="group relative text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300 ease-out" />
                                </a>
                            ))}
                        </div>

                        {/* Social icon links */}
                        <div className="flex items-center gap-5">
                            <a
                                href={LINKS.RESUME}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 overflow-hidden text-xs font-mono uppercase tracking-[0.1em] text-primary border border-primary/20 hover:border-primary/50 transition-colors duration-300 rounded-[2px]"
                            >
                                <span className="relative z-10 font-bold">Resume</span>
                                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            </a>
                            <a
                                href={LINKS.GITHUB}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub Profile"
                                className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                GH
                            </a>
                            <a
                                href={LINKS.LINKEDIN}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn Profile"
                                className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                LI
                            </a>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
