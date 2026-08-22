"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

export type Chapter = { id: string; label: string };

/**
 * A rail of the case study's sections, marking the one being read.
 *
 * The links are plain anchors so <ScrollManager /> intercepts them and scrolls
 * through Lenis, exactly as the main nav does.
 */
export default function CaseStudyNav({ chapters }: { chapters: Chapter[] }) {
    const { scrollYProgress } = useScroll();
    const [active, setActive] = useState<string | null>(
        () => chapters[0]?.id ?? null,
    );

    useEffect(() => {
        const targets = chapters
            .map((chapter) => document.getElementById(chapter.id))
            .filter((el): el is HTMLElement => el !== null);

        if (!targets.length) return;

        // Which sections currently cross the band, kept across callbacks —
        // an entry only reports when it changes, not on every scroll.
        const crossing = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) crossing.add(entry.target.id);
                    else crossing.delete(entry.target.id);
                }

                // Document order, so while a boundary passes through the band
                // the section you are still reading keeps the highlight.
                const current = chapters.find((c) => crossing.has(c.id));
                if (current) setActive(current.id);
            },
            // A band across the upper third of the viewport. The margins must
            // total less than 100% — at exactly 100% the root collapses to zero
            // height and nothing can ever intersect it.
            { rootMargin: "-30% 0px -65% 0px" },
        );

        targets.forEach((target) => observer.observe(target));
        return () => observer.disconnect();
    }, [chapters]);

    return (
        <>
            {/* Sits above the site nav, which would otherwise cover it. */}
            <motion.div
                aria-hidden
                style={{ scaleX: scrollYProgress }}
                className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-primary/70"
            />

            <nav
                aria-label="Case study sections"
                className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-30"
            >
                <ul className="space-y-3.5">
                    {chapters.map((chapter) => {
                        const isActive = chapter.id === active;

                        return (
                            <li key={chapter.id}>
                                <a
                                    href={`#${chapter.id}`}
                                    aria-current={isActive ? "true" : undefined}
                                    className="group flex items-center justify-end gap-3"
                                >
                                    <span
                                        className={`text-[10px] font-mono uppercase tracking-[0.18em] transition-colors duration-300 ${isActive
                                            ? "text-primary"
                                            : "text-muted-foreground/45 group-hover:text-muted-foreground"
                                            }`}
                                    >
                                        {chapter.label}
                                    </span>
                                    <span
                                        className={`block h-px transition-all duration-300 ${isActive
                                            ? "w-8 bg-primary"
                                            : "w-3.5 bg-border group-hover:w-6 group-hover:bg-muted-foreground/60"
                                            }`}
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
