"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
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
                    className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/5"
                >
                    <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
                        {/* Logo */}
                        <a
                            href="#"
                            className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                            np.
                        </a>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Icon Links */}
                        <div className="flex items-center gap-1">
                            <a
                                href={LINKS.GITHUB}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub Profile"
                                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
                            >
                                <Github size={16} />
                            </a>
                            <a
                                href={LINKS.LINKEDIN}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn Profile"
                                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
                            >
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
