import type { CSSProperties } from "react";
import { LINKS } from "@/components/config/links";
import { profileData } from "@/data/profile";

const marigold = { "--w-bg": "#ffb319", "--w-fg": "#121016", "--w-accent": "#121016" } as CSSProperties;

export default function Contact() {
    return (
        <section
            id="contact"
            className="world relative z-10 rounded-t-[clamp(1.5rem,4vw,3rem)]"
            style={marigold}
        >
            <div className="wrap pt-16 pb-28 md:pt-24 md:pb-24">
                <h2 className="poster -ml-[0.05em]" style={{ fontSize: "min(27vw, 22rem)" }}>
                    Say hi
                </h2>

                <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
                    <p className="aside md:col-span-6" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)" }}>
                        {profileData.opportunityStatement}
                    </p>

                    <div className="md:col-span-6 md:text-right">
                        <a
                            href={`mailto:${LINKS.EMAIL}`}
                            data-track="email_click"
                            data-track-from="contact"
                            className="display link break-all"
                            style={{ fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)" }}
                        >
                            {LINKS.EMAIL}
                        </a>
                        <div className="mt-5 flex flex-wrap gap-3 md:justify-end">
                            <a href={LINKS.LINKEDIN} target="_blank" rel="noreferrer" className="btn btn-solid" data-track="profile_click" data-track-site="linkedin">LinkedIn</a>
                            <a href={LINKS.GITHUB} target="_blank" rel="noreferrer" className="btn btn-line" data-track="profile_click" data-track-site="github">GitHub</a>
                            <a href={LINKS.RESUME} target="_blank" rel="noreferrer" className="btn btn-line" data-track="resume_open" data-track-from="contact">Résumé</a>
                        </div>
                    </div>
                </div>

                <p className="mt-16 border-t border-ink/25 pt-5 font-medium">
                    © {new Date().getFullYear()} Nandan Pathak
                </p>
            </div>
        </section>
    );
}
