"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * A word that switches on like a neon sign.
 *
 * Before it lights, each letter is a faint outline, like an unlit glass tube.
 * When the sign scrolls into view the letters strike on in a random order,
 * each with a few false starts, a bright flash, then a steady glow. Moving the
 * pointer quickly across a lit letter makes it stutter, a lit letter
 * occasionally loses power for a moment, and clicking power-cycles the whole
 * sign from the click point.
 *
 * Written for this site. Plain DOM and the Web Animations API, no libraries.
 * With reduced motion on, the sign is simply lit.
 */

type Props = {
    text: string;
    className?: string;
    style?: CSSProperties;
    /** Colour of a lit tube. */
    color?: string;
    /** Colour of the flash when a letter strikes on. */
    flash?: string;
    /** Average false starts before a letter stays lit. */
    flickers?: number;
    /** Seconds between one letter starting and the next. */
    stagger?: number;
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

/** Keyframes for one letter striking on: some quick false starts, a flash, then steady. */
function strikeOn(flickers: number) {
    const frames: Keyframe[] = [{ opacity: 0, filter: "brightness(1)" }];
    const count = Math.max(0, Math.round(rand(flickers - 1, flickers + 1)));
    for (let i = 0; i < count; i++) {
        frames.push({ opacity: rand(0.5, 1), filter: "brightness(1.2)" });
        frames.push({ opacity: rand(0, 0.15), filter: "brightness(1)" });
    }
    frames.push({ opacity: 1, filter: "brightness(1.9)" });
    frames.push({ opacity: 1, filter: "brightness(1)" });
    const duration = 160 + count * 110;
    // Spread the steps unevenly, as a real tube catches irregularly.
    const n = frames.length;
    const offsets: number[] = frames.map((_, i) => (i === n - 1 ? 1 : 0));
    for (let i = 1; i < n - 1; i++) offsets[i] = Math.min(0.92, offsets[i - 1] + rand(0.5, 1.5) / (n - 1));
    frames.forEach((f, i) => (f.offset = offsets[i]));
    return { frames, duration };
}

/** A lit letter briefly losing power. */
function stutter(strength: number): { frames: Keyframe[]; duration: number } {
    const dip = Math.max(0, 1 - strength);
    return {
        frames: [
            { opacity: 1 },
            { opacity: dip, offset: 0.2 },
            { opacity: 1, offset: 0.35 },
            { opacity: dip * 0.6, offset: 0.55 },
            { opacity: 1, filter: "brightness(1.4)", offset: 0.75 },
            { opacity: 1, filter: "brightness(1)" },
        ],
        duration: 220,
    };
}

export default function NeonSign({
    text,
    className = "",
    style,
    color = "#ffb319",
    flash = "#fff4d6",
    flickers = 3,
    stagger = 0.06,
}: Props) {
    const rootRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const tubes = Array.from(root.querySelectorAll<HTMLElement>("[data-tube]"));
        const lit = new Set<number>();
        const busy = new Set<number>();
        const timers: number[] = [];
        const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            tubes.forEach((t) => (t.style.opacity = "1"));
            return;
        }

        const animate = (i: number, spec: { frames: Keyframe[]; duration: number }, onDone?: () => void) => {
            busy.add(i);
            const a = tubes[i].animate(spec.frames, { duration: spec.duration, easing: "steps(1, end)", fill: "forwards" });
            a.onfinish = () => {
                busy.delete(i);
                onDone?.();
            };
        };

        const lightAll = (order: number[], gap: number) => {
            order.forEach((i, k) => {
                later(k * gap * 1000 + rand(0, 60), () =>
                    animate(i, strikeOn(flickers), () => {
                        lit.add(i);
                    }),
                );
            });
        };

        const shuffled = () => tubes.map((_, i) => i).sort(() => Math.random() - 0.5);

        // Power on the first time it scrolls into view.
        let started = false;
        const io = new IntersectionObserver(
            (entries) => {
                if (started || !entries.some((e) => e.isIntersecting)) return;
                started = true;
                io.disconnect();
                lightAll(shuffled(), stagger);
            },
            { threshold: 0.4 },
        );
        io.observe(root);

        // A loose connection: now and then one lit letter blinks out for a moment.
        const flickerTimer = window.setInterval(() => {
            if (!lit.size || document.hidden) return;
            const options = [...lit].filter((i) => !busy.has(i));
            if (!options.length || Math.random() > 0.35) return;
            const i = options[Math.floor(Math.random() * options.length)];
            animate(i, stutter(rand(0.6, 1)));
        }, 1400);

        // Fast pointer movement over lit letters makes them stutter.
        let lastX = 0;
        let lastY = 0;
        let lastT = 0;
        const onMove = (event: PointerEvent) => {
            const now = performance.now();
            const dt = Math.max(1, now - lastT);
            const speed = Math.hypot(event.clientX - lastX, event.clientY - lastY) / dt; // px per ms
            lastX = event.clientX;
            lastY = event.clientY;
            lastT = now;
            if (speed < 0.6) return;
            tubes.forEach((tube, i) => {
                if (!lit.has(i) || busy.has(i)) return;
                const r = tube.getBoundingClientRect();
                const d = Math.hypot(event.clientX - (r.left + r.width / 2), event.clientY - (r.top + r.height / 2));
                const reach = Math.max(90, r.width * 0.6);
                if (d < reach) animate(i, stutter(Math.min(1, speed / 3) * (1 - d / reach) + 0.3));
            });
        };

        // Click: the letters go dark in a wave from the click point, then strike back on.
        const onClick = (event: MouseEvent) => {
            const centres = tubes.map((t) => {
                const r = t.getBoundingClientRect();
                return Math.hypot(event.clientX - (r.left + r.width / 2), event.clientY - (r.top + r.height / 2));
            });
            const order = tubes.map((_, i) => i).sort((a, b) => centres[a] - centres[b]);
            order.forEach((i, k) => {
                later(k * 45, () => {
                    lit.delete(i);
                    tubes[i].getAnimations().forEach((a) => a.cancel());
                    tubes[i].style.opacity = "0";
                });
            });
            later(order.length * 45 + 380, () => lightAll(shuffled(), stagger * 0.8));
        };

        root.addEventListener("pointermove", onMove);
        root.addEventListener("click", onClick);
        return () => {
            io.disconnect();
            window.clearInterval(flickerTimer);
            timers.forEach((t) => window.clearTimeout(t));
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("click", onClick);
        };
    }, [flickers, stagger]);

    const glow = {
        "--neon": color,
        "--neon-flash": flash,
    } as CSSProperties;

    return (
        <span ref={rootRef} role="text" aria-label={text} className={`neon-sign ${className}`} style={{ ...glow, ...style }}>
            {Array.from(text).map((ch, i) =>
                ch === " " ? (
                    <span key={i} aria-hidden> </span>
                ) : (
                    <span key={i} aria-hidden className="neon-letter">
                        {/* The unlit tube: a faint outline. */}
                        <span className="neon-glass">{ch}</span>
                        {/* The lit tube on top, faded in and out. */}
                        <span data-tube className="neon-lit">
                            {ch}
                        </span>
                    </span>
                ),
            )}
        </span>
    );
}
