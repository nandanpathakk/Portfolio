"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

/** Layered corner lights, clipped to the hero and kept behind its content. */
export function HeroSpotlight() {
    const ref = useRef<HTMLDivElement>(null);
    const visible = useInView(ref);

    return (
        <div ref={ref} aria-hidden="true" className="hero-spotlight pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {(["left", "right"] as const).map(side => (
                <div
                    key={side}
                    className={`hero-spotlight__side hero-spotlight__side--${side}`}
                    style={{ animationPlayState: visible ? "running" : "paused" }}
                >
                    <div className="hero-spotlight__beam hero-spotlight__beam--main" />
                    <div className="hero-spotlight__beam hero-spotlight__beam--middle" />
                    <div className="hero-spotlight__beam hero-spotlight__beam--outer" />
                </div>
            ))}
        </div>
    );
}
