"use client";

import { useEffect, useState } from "react";
import HeroBackground from "@/components/HeroBackground";
import HeroBackgroundTide from "@/components/HeroBackgroundTide";
import { HERO_BACKGROUND, type HeroBackgroundChoice } from "@/config/hero";

/** Picks the hero background from src/config/hero.ts, or from ?bg= in the URL. */
export default function HeroBackdrop() {
    const [choice, setChoice] = useState<HeroBackgroundChoice>(HERO_BACKGROUND);

    useEffect(() => {
        const asked = new URLSearchParams(window.location.search).get("bg");
        if (asked === "dither" || asked === "tide") setChoice(asked);
    }, []);

    return choice === "tide" ? <HeroBackgroundTide /> : <HeroBackground />;
}
