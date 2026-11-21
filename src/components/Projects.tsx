import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { Project } from "@/types";
import TrackInView from "@/components/TrackInView";

const world = (project: Project) =>
    ({
        "--w-bg": project.theme?.bg,
        "--w-fg": project.theme?.fg,
        "--w-accent": project.theme?.accent,
    }) as CSSProperties;

// A little lean on each phone, so they read as objects and not a grid.
const LEAN = ["rotate(-5deg) translateY(6%)", "rotate(1.5deg)", "rotate(6deg) translateY(9%)"];

function Shots({ project, priority }: { project: Project; priority?: boolean }) {
    const shots = project.homeShots;
    if (!shots) return null;

    if (shots.orientation === "landscape") {
        return (
            <div className="tilt-group flex h-full items-start justify-center lg:items-center">
                <div
                    className="tilt relative aspect-[16/10] w-full max-w-[52rem] overflow-hidden rounded-xl shadow-[0_40px_70px_-30px_rgb(0_0_0/0.55)] ring-1 ring-black/10 lg:rounded-2xl"
                    style={{ transform: "rotate(-2deg)" }}
                >
                    <Image
                        src={shots.urls[0]}
                        alt={`${project.title} screenshot`}
                        fill
                        priority={priority}
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        className="object-cover object-top"
                    />
                </div>
            </div>
        );
    }

    const lean = shots.urls.length === 2 ? [LEAN[0], LEAN[2]] : LEAN;

    return (
        <div className="tilt-group flex h-full items-start justify-center gap-[3%] pt-4 lg:items-center lg:pt-0">
            {shots.urls.map((url, i) => (
                <div
                    key={url}
                    className={`phone tilt aspect-[9/19] max-w-[17rem] ${shots.urls.length === 2 ? "w-[44%]" : "w-[36%]"} lg:w-[31%]`}
                    style={{ transform: lean[i] }}
                >
                    <Image
                        src={url}
                        alt={`${project.title} screen ${i + 1}`}
                        fill
                        priority={priority}
                        sizes="(min-width: 1024px) 17rem, 44vw"
                        className="object-cover object-top"
                    />
                </div>
            ))}
        </div>
    );
}

/** One extra action beside "Read the story": whatever lets you try the thing fastest. */
function quickLink(project: Project) {
    if (project.download) return { href: project.download.url, label: "Get the APK", external: false, track: "apk_download" };
    if (project.tryIt && !project.demo) return { href: project.tryIt.url, label: project.tryIt.label, external: true };
    if (project.demo) return { href: project.demo.url, label: "Watch the demo", external: true };
    return null;
}

function repoLinks(project: Project) {
    if (typeof project.github === "string") {
        return project.github !== "#" ? [{ label: "Code", url: project.github }] : [];
    }
    return (project.github ?? []).map((g) => ({ label: `${g.label} code`, url: g.url }));
}

export default function Projects() {
    const featured = projectsData.filter((p) => p.slug && p.details && p.pitch);
    const smaller = projectsData.filter((p) => !featured.includes(p));

    return (
        <section id="projects" aria-label="Work">
            {featured.map((project, i) => {
                const quick = quickLink(project);
                return (
                    <article key={project.slug} className="sheet world" style={{ ...world(project), zIndex: i + 1 }}>
                        <div className="wrap flex h-full flex-col gap-6 pb-0 pt-20 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-10 lg:pt-24">
                            <div className="lg:col-span-5">
                                {/* Counts once when this project's panel is actually on screen. */}
                                <TrackInView event="project_view" params={{ project: project.slug! }} />
                                <p className="flex items-center gap-3 font-semibold">
                                    <span className="accent tabular-nums">
                                        {i + 1}/{featured.length}
                                    </span>
                                    <span className="opacity-70">{project.kind}</span>
                                </p>

                                <h2
                                    className="poster mt-3 -ml-[0.04em] text-[21vw] sm:text-[15vw] lg:text-[9.6vw] 2xl:text-[9.5rem]"
                                >
                                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                                </h2>

                                <p className="aside mt-4 max-w-[24ch]" style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.25rem)" }}>
                                    {project.pitch}
                                </p>

                                {project.facts && (
                                    <ul className="mt-5 hidden flex-wrap gap-2 sm:flex">
                                        {project.facts.map((fact) => (
                                            <li key={fact} className="chip">{fact}</li>
                                        ))}
                                    </ul>
                                )}

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className={`btn btn-solid ${i === 0 ? "ringed" : ""}`}
                                        data-track="case_study_open"
                                        data-track-project={project.slug}
                                        data-track-from="home"
                                    >
                                        Read the story
                                    </Link>
                                    {quick && (
                                        <a
                                            href={quick.href}
                                            className="btn btn-line"
                                            data-track={"track" in quick ? quick.track : undefined}
                                            data-track-project={project.slug}
                                            data-track-from="home"
                                            {...(quick.external ? { target: "_blank", rel: "noreferrer" } : {})}
                                        >
                                            {quick.label}
                                        </a>
                                    )}
                                </div>
                            </div>

                            <Link
                                href={`/projects/${project.slug}`}
                                aria-label={`Read the ${project.title} story`}
                                tabIndex={-1}
                                className="block min-h-[16rem] flex-1 lg:col-span-7 lg:h-[78svh] lg:min-h-0"
                            >
                                <Shots project={project} priority={i === 0} />
                            </Link>
                        </div>
                    </article>
                );
            })}

            {/* Everything after the sheets has to sit above them. */}
            {smaller.length > 0 && (
                <div className="sheet world !relative !h-auto" style={{ zIndex: featured.length + 1 }}>
                    <div className="wrap py-16 md:py-24">
                        <h2 className="display text-3xl sm:text-4xl">
                            Also made <span className="aside accent">smaller things</span>
                        </h2>
                        <ul className="mt-8 grid gap-4 md:grid-cols-2">
                            {smaller.map((project) => (
                                <li key={project.title} className="rounded-3xl bg-coal p-6 sm:p-8">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <h3 className="display text-3xl">{project.title}</h3>
                                        <p className="text-muted-foreground">{project.kind}</p>
                                    </div>
                                    <p className="mt-3 max-w-[46ch] text-lg leading-snug text-cream/85">
                                        {project.description}
                                    </p>
                                    {repoLinks(project).length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                                            {repoLinks(project).map((repo) => (
                                                <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="link">
                                                    {repo.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}
