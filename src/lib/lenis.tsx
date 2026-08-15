"use client";

import { ReactLenis as Lenis } from "lenis/react";
import { ReactNode } from "react";

interface LenisProps {
    root?: boolean;
    options?: unknown;
    className?: string;
    children: ReactNode;
}

// Scroll positioning (top on navigation, hash targets) is owned by
// <ScrollManager />, which renders inside this provider.
export function ReactLenis({ root, options, className, children }: LenisProps) {
    return (
        <Lenis
            root={root}
            options={{
                ...(options as object),
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
            }}
            className={className}
        >
            {children}
        </Lenis>
    );
}
