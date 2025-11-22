"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import dynamic from "next/dynamic";

import animationData from "./progress-lottie.json";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    if (!isMounted || dimensions.width === 0) return null;

    // Path: Down the left edge, then across the bottom
    // Padding from edge
    const isMobile = dimensions.width < 768;
    const p = isMobile ? 10 : 20;
    const h = dimensions.height;
    const w = dimensions.width;

    // Construct path string
    // Start at top-left (p, 0) -> down to (p, h-p) -> right to (w, h-p)
    const pathString = `M ${p} 0 L ${p} ${h - p} L ${w} ${h - p}`;

    // Normalize animation data (handle potential default export wrapping)
    const lottieData = (animationData as unknown as { default?: Record<string, unknown> }).default || animationData;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <svg className="w-full h-full overflow-visible">
                {/* Progress Line (Almost Invisible Trail) */}
                <motion.path
                    d={pathString}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.05)" // Very subtle
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    style={{ pathLength: scrollYProgress }}
                />
            </svg>

            {/* The Character */}
            <CharacterOnPath
                progress={scrollYProgress}
                pathString={pathString}
                animationData={lottieData}
                isMobile={isMobile}
            />
        </div>
    );
}

function CharacterOnPath({ progress, pathString, animationData, isMobile }: { progress: MotionValue<number>, pathString: string, animationData: Record<string, unknown>, isMobile: boolean }) {
    const offsetDistance = useTransform(progress, [0, 1], ["0%", "100%"]);
    const sizeClass = isMobile ? "w-12 h-12" : "w-20 h-20";

    return (
        <motion.div
            className={`absolute top-0 left-0 ${sizeClass} flex items-center justify-center`}
            style={{
                offsetPath: `path("${pathString}")`,
                offsetDistance: offsetDistance,
                offsetRotate: "auto 180deg" // Flip orientation as requested
            }}
        >
            <div className="w-full h-full" style={{ transform: "scaleY(-1)" }}>
                <Lottie
                    animationData={animationData}
                    loop={true}
                    className="w-full h-full"
                />
            </div>
        </motion.div>
    )
}
