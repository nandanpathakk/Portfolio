"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { attachLenis, onScroll } from "@/lib/panelSnap";

/** Connects src/lib/panelSnap.ts to Lenis and to native scrolling (touch momentum). */
export default function PanelSnap() {
    const lenis = useLenis();

    useEffect(() => {
        attachLenis(lenis ?? null);
        return () => attachLenis(null);
    }, [lenis]);

    useEffect(() => {
        const handle = () => onScroll(window.scrollY);
        window.addEventListener("scroll", handle, { passive: true });
        return () => window.removeEventListener("scroll", handle);
    }, []);

    return null;
}
