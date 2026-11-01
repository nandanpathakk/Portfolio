"use client";

import { useRef, type TouchEventHandler } from "react";

/** Touch-only navigation; vertical scrolling and pinch zoom stay native. */
export function useSwipe(onSwipe: (direction: "left" | "right") => void) {
    const start = useRef<{ x: number; y: number } | null>(null);
    const onTouchStart: TouchEventHandler = (event) => {
        if (event.target instanceof Element && event.target.closest("button, a, input, textarea")) {
            start.current = null;
            return;
        }
        start.current = event.touches.length === 1
            ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
            : null;
    };
    const onTouchMove: TouchEventHandler = (event) => {
        if (!start.current) return;
        if (event.touches.length !== 1) {
            start.current = null;
            return;
        }
        const dx = Math.abs(event.touches[0].clientX - start.current.x);
        const dy = Math.abs(event.touches[0].clientY - start.current.y);
        // Once the user starts scrolling down the page, never change a slide.
        if (dy > 12 && dy > dx) start.current = null;
    };
    const onTouchEnd: TouchEventHandler = (event) => {
        const origin = start.current;
        start.current = null;
        if (!origin || event.touches.length || !event.changedTouches.length) return;
        const dx = event.changedTouches[0].clientX - origin.x;
        const dy = event.changedTouches[0].clientY - origin.y;
        if (Math.abs(dx) >= 44 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            onSwipe(dx < 0 ? "left" : "right");
        }
    };
    return { onTouchStart, onTouchMove, onTouchEnd, onTouchCancel: () => { start.current = null; } };
}
