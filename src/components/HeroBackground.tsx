"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// WebGL never runs on the server, and the hero text must not wait for it.
const Dither = dynamic(() => import("@/components/backgrounds/Dither"), { ssr: false });

// Both layers draw the same waves, so the torch lines up with the dots under it.
const WAVES = {
    backgroundColor: "transparent",
    colorNum: 4,
    pixelSize: 3,
    ditherMode: "bayer",
    waveSpeed: 0.04,
    waveFrequency: 2.6,
    waveAmplitude: 0.32,
    scale: 1.1,
    contrast: 1.15,
    intro: true,
    dpr: 1.5,
} as const;

/**
 * The hero background: slow waves printed as cream newsprint dots, so the
 * marigold name is the only colour on screen. On devices with a mouse, the
 * cursor is a torch. A second, marigold copy of the same waves shows through
 * a soft circle that trails the pointer.
 */
export default function HeroBackground() {
    const [ready, setReady] = useState(false);
    const [torch, setTorch] = useState(false);
    const torchRef = useRef<HTMLDivElement>(null);

    // Start after the first paint, so the name is never held up by the shader.
    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setReady(true);
            const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            setTorch(fine && !still);
        });
        return () => cancelAnimationFrame(id);
    }, []);

    // Move the torch with a little lag, so it feels like light, not a sticker.
    useEffect(() => {
        const el = torchRef.current;
        if (!torch || !el) return;

        const target = { x: 0, y: 0, on: 0 };
        const now = { x: 0, y: 0, on: 0 };
        let placed = false;
        let raf = 0;

        const tick = () => {
            now.x += (target.x - now.x) * 0.16;
            now.y += (target.y - now.y) * 0.16;
            now.on += (target.on - now.on) * 0.1;
            el.style.setProperty("--tx", `${now.x}px`);
            el.style.setProperty("--ty", `${now.y}px`);
            el.style.opacity = now.on.toFixed(3);
            const settled =
                Math.abs(target.x - now.x) < 0.3 &&
                Math.abs(target.y - now.y) < 0.3 &&
                Math.abs(target.on - now.on) < 0.005;
            raf = settled ? 0 : requestAnimationFrame(tick);
        };
        const wake = () => {
            if (!raf) raf = requestAnimationFrame(tick);
        };

        const onMove = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
            target.x = x;
            target.y = y;
            target.on = inside ? 1 : 0;
            if (!placed) {
                now.x = x;
                now.y = y;
                placed = true;
            }
            wake();
        };
        const onLeave = () => {
            target.on = 0;
            wake();
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
        };
    }, [torch]);

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="hero-dither absolute inset-0">
                {ready && (
                    <Dither
                        {...WAVES}
                        waveColor="#f3ecdc"
                        enableMouseInteraction={false}
                        clickRipple
                    />
                )}
            </div>

            {torch && (
                <div ref={torchRef} className="hero-torch absolute inset-0" style={{ opacity: 0 }}>
                    <Dither
                        {...WAVES}
                        waveColor="#ffb319"
                        contrast={1.4}
                        enableMouseInteraction={false}
                        clickRipple
                    />
                </div>
            )}
        </div>
    );
}
