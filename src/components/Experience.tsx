import { experienceData } from "@/data/experience";

export default function Experience() {
    return (
        <section id="experience" className="relative z-10 bg-ink">
            <div className="wrap py-16 md:py-24">
                <h2 className="display text-3xl sm:text-4xl">
                    Where I work <span className="aside accent">the day job</span>
                </h2>

                <div className="mt-8 md:mt-12">
                    {experienceData.map((job) => (
                        <article
                            key={job.company}
                            className="grid gap-x-10 gap-y-5 border-t border-border py-8 md:py-12 lg:grid-cols-12"
                        >
                            <header className="lg:col-span-5">
                                <h3 className="display text-3xl sm:text-4xl">{job.company}</h3>
                                <p className="mt-2 text-lg font-semibold">{job.role}</p>
                                <p className="text-muted-foreground">{job.year}</p>
                                {job.client && (
                                    <p className="mt-3 max-w-[38ch] text-cream/85">
                                        Working full-time with {job.client.name}, {job.client.description}.
                                    </p>
                                )}
                            </header>

                            <ul className="lg:col-span-7 space-y-3 self-start">
                                {(job.highlights ?? job.bullets ?? []).map((line) => (
                                    <li key={line} className="flex gap-3 text-lg leading-snug sm:text-xl">
                                        <span aria-hidden className="accent font-bold">+</span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
