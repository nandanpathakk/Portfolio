"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

// How long to keep waiting for a hash target to appear in the DOM before
// giving up. Sections are statically imported now, so this is a safety net for
// anything that mounts late (images resizing, a section behind a guard).
const TARGET_WAIT_MS = 8000;
// Once the target appears, keep re-aligning for this long: content mounting
// *above* it shifts its offset and would otherwise strand us mid-page.
const SETTLE_MS = 1200;
const POLL_MS = 32;
// Duration of an in-page anchor scroll, in seconds.
const ANCHOR_DURATION = 1.1;

/**
 * Owns all scroll positioning for the app.
 *
 * Next's router and Lenis both want to drive window scroll, and they fight:
 * Lenis keeps its own `animatedScroll` value and writes it back on the next
 * frame, so a client-side navigation can leave you at the *previous* page's
 * offset (e.g. deep inside a case study when you clicked from #projects).
 *
 * Polling is timer-driven rather than rAF-driven so it still runs when the
 * page is loaded in a background tab.
 *
 * Must be rendered inside <ReactLenis> so `useLenis` can reach the instance.
 */
export default function ScrollManager() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
    }, []);

    // --- Positioning on arrival (fresh load or route change) ---
    useEffect(() => {
        let cancelled = false;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const timers: ReturnType<typeof setTimeout>[] = [];

        // Real input means the user has taken over — stop repositioning.
        const abort = () => {
            cancelled = true;
        };
        const abortEvents = ["wheel", "touchstart", "pointerdown", "keydown"];
        abortEvents.forEach((e) =>
            window.addEventListener(e, abort, { passive: true })
        );

        // Drive both, so we are correct whether or not Lenis has taken over.
        const scrollTo = (y: number) => {
            lenis?.scrollTo(y, { immediate: true, force: true });
            window.scrollTo(0, y);
        };

        const hash = safeHash();

        if (hash) {
            const start = Date.now();
            let foundAt = 0;

            const align = () => {
                if (cancelled) return;

                const el = resolve(hash);
                const now = Date.now();

                if (!el) {
                    if (now - start < TARGET_WAIT_MS) timer = setTimeout(align, POLL_MS);
                    return;
                }

                if (!foundAt) foundAt = now;
                scrollTo(offsetOf(el));
                if (now - foundAt < SETTLE_MS) timer = setTimeout(align, POLL_MS);
            };

            align();
        } else {
            const toTop = () => {
                if (cancelled) return;
                scrollTo(0);
            };

            toTop();
            // The terminal input uses autoFocus, which can yank the page down
            // after paint — re-assert the top over the next few ticks.
            [0, 60, 200].forEach((d) => timers.push(setTimeout(toTop, d)));
        }

        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
            timers.forEach(clearTimeout);
            abortEvents.forEach((e) => window.removeEventListener(e, abort));
        };
    }, [pathname, lenis]);

    // --- In-page anchor clicks ---
    // Handled here rather than left to the browser: a native hash jump is a
    // no-op when the target isn't in the DOM yet (the click is silently lost),
    // and it also fights Lenis, which re-applies its own offset next frame.
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;

        // Lenis animates on rAF, which is suspended in a background tab — an
        // animated scroll there would simply never happen. Reduced-motion
        // users get the jump too.
        const canAnimate = () =>
            !document.hidden &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const jumpTo = (y: number, animate: boolean) => {
            if (animate && canAnimate() && lenis) {
                lenis.scrollTo(y, { duration: ANCHOR_DURATION, force: true });
            } else {
                lenis?.scrollTo(y, { immediate: true, force: true });
                window.scrollTo(0, y);
            }
        };

        const goTo = (hash: string, animate: boolean) => {
            const start = Date.now();

            const attempt = () => {
                const el = resolve(hash);
                if (!el) {
                    if (Date.now() - start < TARGET_WAIT_MS) timer = setTimeout(attempt, POLL_MS);
                    return;
                }
                jumpTo(offsetOf(el), animate);
            };

            attempt();
        };

        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                return;
            }

            const anchor = (e.target as Element | null)?.closest?.("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href || !href.includes("#")) return;
            if (anchor.target && anchor.target !== "_self") return;

            const url = new URL(href, window.location.href);
            // Only in-page jumps; anything crossing pages is the router's job.
            if (url.origin !== window.location.origin) return;
            if (url.pathname !== window.location.pathname) return;

            // A bare "#" (the nav logo) means "back to the top". Left to the
            // browser this is a native jump that Lenis immediately undoes.
            if (!url.hash || url.hash === "#") {
                if (href.trim().startsWith("#")) {
                    e.preventDefault();
                    jumpTo(0, true);
                }
                return;
            }

            const hash = decodeHash(url.hash);
            if (!hash) return;

            e.preventDefault();
            if (window.location.hash !== url.hash) {
                window.history.pushState(null, "", url.hash);
            }
            goTo(hash, true);
        };

        // Back/forward between anchors on the same page.
        const onHashChange = () => {
            const hash = safeHash();
            if (hash) goTo(hash, true);
        };

        document.addEventListener("click", onClick);
        window.addEventListener("hashchange", onHashChange);

        return () => {
            if (timer) clearTimeout(timer);
            document.removeEventListener("click", onClick);
            window.removeEventListener("hashchange", onHashChange);
        };
    }, [lenis]);

    return null;
}

function decodeHash(raw: string): string | null {
    let hash = raw;
    try {
        hash = decodeURIComponent(raw);
    } catch {
        // keep the raw value
    }
    return hash.length > 1 ? hash : null;
}

function safeHash(): string | null {
    return decodeHash(window.location.hash);
}

function resolve(hash: string): Element | null {
    try {
        return document.querySelector(hash);
    } catch {
        return null; // not a valid selector
    }
}

function offsetOf(el: Element): number {
    return el.getBoundingClientRect().top + window.scrollY;
}
