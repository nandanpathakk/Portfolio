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
        id: "projects",
        label: "Projects",
        hint: "projects and case studies covering user problems, UX decisions, tradeoffs and technical work",
    },
    {
        id: "experience",
        label: "Experience",
        hint: "jobs, companies, and what he shipped at each",
    },
    {
        id: "about",
        label: "About",
        hint: "who he is and how he approaches building useful products",
    },
    {
        id: "skills",
        label: "Skills",
        hint: "product and UX capabilities, languages, frameworks and tools, grouped",
    },
    {
        id: "contact",
        label: "Contact",
        hint: "how to reach him and his interest in developer and product management roles",
    },
];
