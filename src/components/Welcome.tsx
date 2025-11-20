
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Welcome() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm md:text-base font-mono text-muted-foreground mb-6 tracking-widest uppercase">
                        Nandan Pathak
                    </h2>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter font-syne leading-none">
                        CREATIVE<br />
                        <span className="text-muted-foreground">DEVELOPER</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-12 font-light leading-relaxed">
                        Crafting immersive digital experiences with code and precision.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
                        <a
                            href="#projects"
                            className="group relative px-8 py-3 bg-white text-black font-medium rounded-full overflow-hidden transition-all hover:scale-105"
                        >
                            <span className="relative flex items-center gap-2">
                                Selected Work <ArrowRight size={18} />
                            </span>
                        </a>
                        <a
                            href="mailto:your.email@example.com"
                            className="px-8 py-3 text-white hover:text-white/80 transition-colors font-medium"
                        >
                            Get in Touch
                        </a>
                    </div>

                    <div className="flex items-center justify-center gap-8 text-muted-foreground">
                        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
                            <Github size={24} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
                            <Linkedin size={24} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors hover:scale-110 transform duration-200">
                            <Mail size={24} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}