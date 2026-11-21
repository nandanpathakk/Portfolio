"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ParticleTide = dynamic(() => import("@/components/backgrounds/ParticleTide"), { ssr: false });

/**
 * Experimental hero background: a sea of cream points rolling toward the
 * viewer. The cursor lifts a marigold swell; a click sends a ring out.
 */
export default function HeroBackgroundTide() {
    const [ready, setReady] = useState(false);

    // Start after the first paint, so the name is never held up by WebGL.
    useEffect(() => {
        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div aria-hidden className="hero-tide pointer-events-none absolute inset-0 -z-10">
            {ready && <ParticleTide />}
        </div>
    );
}
