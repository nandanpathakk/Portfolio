"use client";

import { LenisRef, ReactLenis as Lenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";

interface LenisProps {
    root?: boolean;
    options?: unknown;
    className?: string;
    children: ReactNode;
}

export function ReactLenis({ root, options, className, children }: LenisProps) {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual"
        }

        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
        })
    }, []);

    return (
        <Lenis
            root={root}
            options={{ ...(options as object), lerp: 0.1, duration: 1.5, smoothWheel: true }} className={className} ref={lenisRef}>
            {children}
        </Lenis>
    );
}   
