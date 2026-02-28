"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { MouseEvent } from "react";

export const MagicCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const reducedMotion = useReducedMotion();

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (reducedMotion) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group relative border border-border bg-card/30 overflow-hidden",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className={`pointer-events-none absolute -inset-px opacity-0 transition duration-300 ${!reducedMotion ? "group-hover:opacity-100" : ""}`}
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              580px circle at ${mouseX}px ${mouseY}px,
              rgba(200, 145, 55, 0.10),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};
