"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "@/components/config/links";
import { siteSections } from "@/data/sections";

// Same registry the assistant navigates by. Skills lives inside About now, so
// it keeps its anchor but not its own nav entry.
const navLinks = siteSections
    .filter(({ id }) => id !== "skills")
    .map(({ id, label }) => ({
        href: `/#${id}`,
        label: id === "projects" ? "Work" : label,
    }));

/** A floating pill, so it sits on any of the page's colours without needing to match them. */
export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => { setMenuOpen(false); }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [menuOpen]);

    return (
        <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-[var(--gutter)] sm:top-4">
            <div className="pointer-events-auto mx-auto w-full max-w-fit rounded-[1.75rem] bg-[#0b0a0e]/85 text-cream shadow-[0_10px_30px_-12px_rgb(0_0_0/0.7)] ring-1 ring-white/10 backdrop-blur-md max-md:max-w-none">
                <div className="flex h-12 items-center justify-between gap-2 pl-5 pr-1.5">
                    <Link href="/" className="mr-3 font-bold" style={{ fontStretch: "116%" }}>
                        Nandan Pathak
                    </Link>

                    <nav aria-label="Main" className="hidden items-center md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="rounded-full px-3.5 py-2 font-medium text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href={LINKS.RESUME}
                            target="_blank"
                            rel="noreferrer"
                            className="ml-2 rounded-full bg-marigold px-4 py-2 font-bold text-ink transition-transform hover:-rotate-2"
                        >
                            Résumé
                        </a>
                    </nav>

                    <button
                        type="button"
                        className="rounded-full bg-white/10 px-4 py-2 font-semibold md:hidden"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? "Close" : "Menu"}
                    </button>
                </div>

                {menuOpen && (
                    <nav id="mobile-navigation" aria-label="Main" data-lenis-prevent className="px-2 pb-2 md:hidden">
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="display flex min-h-14 items-center rounded-2xl px-3 text-3xl active:bg-white/10"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={LINKS.RESUME}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setMenuOpen(false)}
                                    className="display mt-1 flex min-h-14 items-center rounded-2xl bg-marigold px-3 text-3xl text-ink"
                                >
                                    Résumé
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
