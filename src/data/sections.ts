import { SiteSection } from "@/types";

/**
 * The anchors the assistant may send a visitor to. This is the whitelist: a
 * marker naming anything not listed here is dropped, so a confused model can
 * never produce a chip that scrolls nowhere.
 *
 * Each `id` must match a real `id` attribute on the page — see the section
 * components rendered by `src/app/page.tsx`.
 */
export const siteSections: SiteSection[] = [
    {
        id: "about",
        label: "About",
        hint: "who he is and how he works",
    },
    {
        id: "experience",
        label: "Experience",
        hint: "jobs, companies, and what he shipped at each",
    },
    {
        id: "skills",
        label: "Skills",
        hint: "languages, frameworks and tools, grouped",
    },
    {
        id: "projects",
        label: "Projects",
        hint: "the things he has built, with links and case studies",
    },
    {
        id: "contact",
        label: "Contact",
        hint: "how to reach him",
    },
];
