"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * An invisible marker that sends one analytics event the first time it
 * scrolls into view (and only if the visitor allowed analytics).
 */
export default function TrackInView({
    event,
    params,
    className = "",
}: {
    event: string;
    params?: Record<string, string>;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const key = JSON.stringify(params ?? {});

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
                track(event, JSON.parse(key));
                io.disconnect();
            }
        });
        io.observe(el);
        return () => io.disconnect();
    }, [event, key]);

    return <span ref={ref} aria-hidden className={`pointer-events-none block h-px w-px ${className}`} />;
}
