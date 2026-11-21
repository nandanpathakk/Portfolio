"use client";

import { useEffect, useState } from "react";

/**
 * The name, in Devanagari first and then in English. It swaps once on load,
 * and again whenever you click it. Both versions share one grid cell, so the
 * swap never moves the page.
 */
export default function HeroName() {
    // English is the server-rendered state, so the name is right without JS.
    const [hindi, setHindi] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setHindi(true);
        const timer = setTimeout(() => setHindi(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <button
            type="button"
            onClick={() => setHindi((value) => !value)}
            aria-label="Nandan Pathak. Press to switch between Hindi and English."
            className="name-swap block w-full cursor-pointer text-left"
        >
            <span aria-hidden={hindi} className="poster block">
                Nandan
                <br />
                Pathak
            </span>
            <span
                lang="hi"
                aria-hidden={!hindi}
                className="poster block"
                style={{ lineHeight: 0.98, letterSpacing: "-0.01em", fontSize: "0.92em" }}
            >
                नंदन
                <br />
                पाठक
            </span>
        </button>
    );
}
