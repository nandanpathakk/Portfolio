import Image from "next/image";
import { skillsData } from "@/data/skills";

function Ticker({ items, reverse, speed }: { items: string[]; reverse?: boolean; speed: string }) {
    // The list is doubled so the loop has no seam; the copy is hidden from screen readers.
    return (
        <div className="ticker-mask">
            <ul
                className="ticker gap-2 py-1"
                data-reverse={reverse ? "" : undefined}
                style={{ "--speed": speed } as React.CSSProperties}
            >
                {[...items, ...items].map((item, i) => (
                    <li key={i} aria-hidden={i >= items.length} className="chip !px-5 !py-2.5 !text-lg">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function About() {
    const groups = Object.values(skillsData);
    const build = [...groups[0], ...groups[1]];
    const rest = groups.slice(2).flat();

    return (
        <section id="about" className="relative z-10 bg-ink">
            <div className="wrap flex flex-col gap-8 pt-10 pb-10 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-16 md:pb-14">
                {/* The source photo is 400px square, so it never renders wider than 17rem. */}
                <div className="sticker relative w-36 shrink-0 rotate-3 sm:w-44 md:order-2 md:mr-[4%] md:w-64 lg:w-[17rem]">
                    <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.75rem] bg-marigold md:translate-x-4 md:translate-y-4" />
                    <Image
                        src="/images/nandan.jpg"
                        alt="Nandan Pathak, smiling, standing in front of green leaves"
                        width={400}
                        height={400}
                        sizes="(min-width: 768px) 17rem, 11rem"
                        className="relative aspect-square w-full rounded-[1.75rem] object-cover"
                    />
                </div>

                <p
                    className="aside max-w-[20ch] text-cream"
                    style={{ fontSize: "clamp(2rem, 5.4vw, 5rem)", lineHeight: 1.06, fontWeight: 600 }}
                >
                    I write code for a living. The part I enjoy most is deciding{" "}
                    <span className="accent">what&apos;s worth building.</span>
                </p>
            </div>

            {/* #skills stays as an anchor so old links and the assistant still land here. */}
            <div id="skills" className="space-y-2 pb-16 md:pb-24" aria-label="What I work with">
                <Ticker items={build} speed="55s" />
                <Ticker items={rest} reverse speed="60s" />
            </div>
        </section>
    );
}
