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
        // Ensure scroll is at top when Lenis initializes
        const resetScroll = () => {
            if (typeof window !== "undefined") {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        };

        // Reset immediately
        resetScroll();

        // Wait for Lenis instance to be ready
        const ensureLenisScrollTop = () => {
            if (lenisRef.current?.lenis) {
                lenisRef.current.lenis.scrollTo(0, { immediate: true });
                // Also reset native scroll as backup
                resetScroll();
            } else {
                // Retry if Lenis isn't ready yet
                requestAnimationFrame(ensureLenisScrollTop);
            }
        };

        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            resetScroll();
            ensureLenisScrollTop();
        });

        // Additional safeguard after a short delay
        const timeoutId = setTimeout(() => {
            resetScroll();
            lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
        }, 10);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Lenis
            root={root}
            options={{ 
                ...(options as object), 
                lerp: 0.1, 
                duration: 1.5, 
                smoothWheel: true
            }} 
            className={className} 
            ref={lenisRef}
        >
            {children}
        </Lenis>
    );
}   
