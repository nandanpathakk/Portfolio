import type { CSSProperties } from "react";
import { LINKS } from "@/components/config/links";
import { profileData } from "@/data/profile";
import HeroName from "@/components/HeroName";
import HeroBackdrop from "@/components/HeroBackdrop";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default function Welcome() {
    return (
        <section className="relative isolate overflow-hidden">
            <HeroBackdrop />

            {/* Phones and tablets: the hero is as tall as its content. Laptops: it fills the screen. */}
            <div className="wrap relative flex flex-col justify-end pt-28 pb-16 sm:pt-32 lg:min-h-svh lg:pb-20 lg:pt-20">
                {/* The name fills the screen. Size is bound by both width and height so it always fits. */}
                <h1
                    className="rise relative text-marigold -ml-[0.05em]"
                    style={{ ...step(0), fontSize: "min(20.5vw, 26svh)" }}
                >
                    <HeroName />
                </h1>

                <div className="relative mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
                    <p
                        className="rise aside max-w-[20ch] text-cream lg:max-w-[26ch]"
                        style={{ ...step(1), fontSize: "clamp(1.5rem, 2.9vw, 2.6rem)" }}
                    >
                        {profileData.summary}
                    </p>

                    <div className="rise flex flex-col gap-4 md:items-end" style={step(2)}>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            <span className="chip sticker bg-marigold text-ink !shadow-none -rotate-2">
                                Open to developer + product roles
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a href="#projects" className="btn btn-solid" data-track="see_work_click">See the work</a>
                            <a href={LINKS.RESUME} target="_blank" rel="noreferrer" className="btn btn-line" data-track="resume_open" data-track-from="hero">
                                Résumé
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
