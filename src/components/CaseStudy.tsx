import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { MediaItem, Project } from "@/types";
import { LINKS } from "@/components/config/links";
import { projectsData } from "@/data/projects";
import CaseStudyNav, { Chapter } from "@/components/CaseStudyNav";

const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

/** Section labels are prose, so two of them could slugify alike. */
function uniqueSlugs(labels: string[]): string[] {
    const seen = new Map<string, number>();

    return labels.map((label) => {
        const base = slugify(label) || "section";
        const used = seen.get(base) ?? 0;

        seen.set(base, used + 1);
        return used ? `${base}-${used + 1}` : base;
    });
}

/** Screens: phones stand in a row, wide shots stack. On a phone both become a swipeable strip. */
function Screens({ project, media }: { project: Project; media: MediaItem[] }) {
    const portrait = project.homeShots?.orientation === "portrait";

    return (
        <section id="screens">
            <div className="wrap pb-12 md:pb-20">
                <div
                    tabIndex={0}
                    role="group"
                    aria-label={`${project.title} screens. Scroll sideways for more.`}
                    className={
                        portrait
                            ? "strip gap-4 sm:gap-6 -mx-[var(--gutter)] px-[var(--gutter)] scroll-px-[var(--gutter)] lg:justify-center"
                            : "strip gap-4 -mx-[var(--gutter)] px-[var(--gutter)] scroll-px-[var(--gutter)] md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible"
                    }
                >
                    {media.map((item, i) => (
                        <figure
                            key={item.url}
                            className={portrait ? "w-[62vw] max-w-[16.5rem]" : "w-[86vw] md:w-auto"}
                        >
                            <div
                                className={
                                    portrait
                                        ? "phone aspect-[9/19]"
                                        : "relative aspect-[16/10] overflow-hidden rounded-lg shadow-[0_30px_50px_-30px_rgb(0_0_0/0.6)] ring-1 ring-black/10"
                                }
                            >
                                {item.type === "video" ? (
                                    <video
                                        src={item.url}
                                        loop
                                        muted
                                        playsInline
                                        controls
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={item.url}
                                        alt={item.caption ?? `${project.title} screen ${i + 1}`}
                                        fill
                                        priority={i < 2}
                                        sizes={portrait ? "(min-width: 640px) 17rem, 62vw" : "(min-width: 768px) 40vw, 86vw"}
                                        className="object-cover object-top"
                                    />
                                )}
                            </div>
                            {item.caption && (
                                <figcaption className="mt-3 text-[0.95rem] leading-snug opacity-80">
                                    {item.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function CaseStudy({ project }: { project: Project }) {
    const details = project.details!;
    const media = details.media ?? project.media;
    const action = project.download
        ? {
              heading: "Put it on your phone, or theirs",
              note: project.download.note,
              url: project.download.url,
              label: "Download the APK",
              meta: project.download.meta,
              steps: project.download.steps,
              external: false,
          }
        : project.tryIt
          ? {
                heading: project.tryIt.heading,
                note: project.tryIt.note,
                url: project.tryIt.url,
                label: project.tryIt.label,
                meta: project.tryIt.meta,
                steps: project.tryIt.steps,
                external: true,
            }
          : null;

    const sectionIds = uniqueSlugs(details.sections.map((section) => section.label));

    const chapters: Chapter[] = [
        { id: "overview", label: "Overview" },
        ...(media?.length ? [{ id: "screens", label: "Screens" }] : []),
        ...details.sections.map((section, i) => ({ id: sectionIds[i], label: section.label })),
        ...(action ? [{ id: "try-it", label: "Try it" }] : []),
    ];

    const others = projectsData.filter((p) => p.slug && p.details && p.slug !== project.slug);
    const repo = typeof project.github === "string" && project.github !== "#" ? project.github : null;
    const world = {
        "--w-bg": project.theme?.bg,
        "--w-fg": project.theme?.fg,
        "--w-accent": project.theme?.accent,
    } as CSSProperties;
    const marigold = { "--w-bg": "#ffb319", "--w-fg": "#121016", "--w-accent": "#121016" } as CSSProperties;

    return (
        <main>
            <div className="world rounded-b-[clamp(1.5rem,4vw,3rem)]" style={world}>
                <header className="wrap pt-24 pb-10 md:pt-32 md:pb-14">
                    <Link href="/#projects" className="link font-medium opacity-80">
                        All work
                    </Link>
                    <h1
                        className="poster accent mt-5 -ml-[0.05em]"
                        style={{ fontSize: "min(26vw, 17rem)" }}
                    >
                        {project.title}
                    </h1>
                    <p
                        className="aside mt-5 max-w-[26ch] md:mt-8"
                        style={{ fontSize: "clamp(1.6rem, 3.4vw, 3rem)" }}
                    >
                        {details.tagline}
                    </p>

                    <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-current/25 pt-6 md:grid-cols-4">
                        {[
                            ["Year", details.year],
                            ["My role", details.role],
                            ["Where it stands", details.status],
                            ["Built with", details.stack.join(", ")],
                        ].map(([term, value]) => (
                            <div key={term}>
                                <dt className="font-bold">{term}</dt>
                                <dd className="mt-1 leading-snug opacity-80">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </header>

                {media && media.length > 0 && <Screens project={project} media={media} />}
            </div>

            <div className="wrap py-14 md:py-20 xl:grid xl:grid-cols-12 xl:gap-8">
                <div className="mx-auto max-w-[42rem] xl:mx-0 xl:max-w-none xl:col-span-7 xl:col-start-2">
                    <section id="overview" className="reading space-y-5">
                        {details.overview.map((paragraph, i) => (
                            <p key={i} className={i === 0 ? "text-[1.12em] leading-[1.5]" : undefined}>
                                {paragraph}
                            </p>
                        ))}
                    </section>

                    {project.demo && (
                        <section id="demo" className="mt-12">
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-coal">
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${project.demo.youtubeId}`}
                                    title={`${project.title} demo video`}
                                    loading="lazy"
                                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    className="absolute inset-0 h-full w-full border-0"
                                />
                            </div>
                            <a href={project.demo.url} target="_blank" rel="noreferrer" className="link mt-3 inline-block">
                                Watch the demo on YouTube
                            </a>
                        </section>
                    )}

                    {details.sections.map((section, i) => (
                        <section key={sectionIds[i]} id={sectionIds[i]} className="mt-16 md:mt-24 scroll-mt-24">
                            <h2 className="display text-3xl sm:text-4xl md:text-5xl leading-[1.02]">
                                {section.title}
                            </h2>
                            <div className="reading mt-6 space-y-5">
                                {section.body.map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                            {section.bullets && section.bullets.length > 0 && (
                                <ul className="reading mt-5 space-y-3">
                                    {section.bullets.map((bullet, idx) => (
                                        <li key={idx} className="relative pl-6">
                                            <span aria-hidden className="absolute left-0 top-[0.78em] h-[2px] w-3 bg-marigold" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>

                <div className="xl:col-span-2 xl:col-start-11">
                    <CaseStudyNav chapters={chapters} />
                </div>
            </div>

            {action && (
                <section id="try-it" className="world scroll-mt-16 rounded-t-[clamp(1.5rem,4vw,3rem)]" style={world}>
                    <div className="wrap py-14 md:py-20 grid gap-x-8 gap-y-8 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <h2 className="display text-3xl sm:text-4xl md:text-5xl">{action.heading}</h2>
                            {action.note && <p className="reading mt-5 max-w-[60ch]">{action.note}</p>}
                            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                                <a
                                    href={action.url}
                                    className="btn btn-solid"
                                    {...(action.external ? { target: "_blank", rel: "noreferrer" } : {})}
                                >
                                    {action.label}
                                </a>
                                {project.download?.releaseUrl && (
                                    <a href={project.download.releaseUrl} target="_blank" rel="noreferrer" className="link">
                                        Release notes
                                    </a>
                                )}
                                {repo && (
                                    <a href={repo} target="_blank" rel="noreferrer" className="link">
                                        Code on GitHub
                                    </a>
                                )}
                            </div>
                            {action.meta && <p className="mt-4 opacity-75">{action.meta}</p>}
                        </div>

                        {action.steps && action.steps.length > 0 && (
                            <ol className="lg:col-span-4 lg:col-start-9 space-y-4 text-lg leading-relaxed">
                                {action.steps.map((step, i) => (
                                    <li key={i} className="grid grid-cols-[1.75rem_1fr]">
                                        <span className="accent font-bold">{i + 1}.</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                </section>
            )}

            <section className="world" style={marigold}>
                <div className="wrap pt-16 pb-28 md:py-24 grid gap-x-8 gap-y-12 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <h2 className="poster text-5xl sm:text-7xl md:text-8xl max-w-[12ch]" style={{ lineHeight: 0.9 }}>
                            Want to talk about this one?
                        </h2>
                        <p className="aside mt-6 max-w-[30ch] text-2xl md:text-3xl">
                            I&apos;m happy to go through the code, or the decisions I&apos;d make differently now.
                        </p>
                        <a href={`mailto:${LINKS.EMAIL}`} className="btn btn-solid mt-7">
                            Email me
                        </a>
                    </div>

                    {others.length > 0 && (
                        <div className="lg:col-span-4 lg:col-start-9">
                            <h3 className="text-xl font-semibold">Read another</h3>
                            <ul className="mt-4 border-t border-ink/25">
                                {others.map((other) => (
                                    <li key={other.slug} className="border-b border-ink/25">
                                        <Link href={`/projects/${other.slug}`} className="group block py-4">
                                            <span className="display text-3xl group-hover:underline underline-offset-4 decoration-2">
                                                {other.title}
                                            </span>
                                            <span className="mt-1 block opacity-75">{other.kind}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
