"use client";

import { MagicCard } from "./ui/MagicCard";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { skillsData } from "@/data/skills";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-primary">
          Skills
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {Object.keys(skillsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${activeTab === tab
                ? "bg-white text-black shadow-lg scale-105"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
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
              initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -20 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {skillsData[activeTab as keyof typeof skillsData].map((skill) => (
                <MagicCard key={skill} className="p-3 sm:p-4 md:p-6 flex items-center justify-center text-center">
                  <span className="text-sm sm:text-base md:text-lg font-medium text-foreground">{skill}</span>
                </MagicCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}