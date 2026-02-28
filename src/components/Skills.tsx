"use client";

import { MagicCard } from "./ui/MagicCard";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skillsData } from "@/data/skills";

export default function Skills() {
    const [activeTab, setActiveTab] = useState("Frontend");
    const reducedMotion = useReducedMotion();

    return (
        <section id="skills" className="py-24">
            <div className="px-6 md:px-10 lg:px-16">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reducedMotion ? 0 : 0.6 }}
                    className="mb-14 md:mb-18"
                >
                    <p className="section-label mb-5">Skills</p>
                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl font-normal leading-none"
                        style={{ fontFamily: "var(--font-elegant), serif" }}
                    >
                        Tools of<br /><em>the trade.</em>
                    </h2>
                </motion.div>

                {/* Tabs — amber when active, square edges */}
                <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
                    {Object.keys(skillsData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 text-xs font-mono uppercase tracking-[0.15em] border transition-all duration-200 ${
                                activeTab === tab
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -16 }}
                            transition={{ duration: reducedMotion ? 0 : 0.28 }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl"
                        >
                            {skillsData[activeTab as keyof typeof skillsData].map((skill) => (
                                <MagicCard
                                    key={skill}
                                    className="p-4 md:p-5 flex items-center justify-center text-center rounded-none border-border"
                                >
                                    <span className="text-sm font-medium text-foreground">
                                        {skill}
                                    </span>
                                </MagicCard>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
