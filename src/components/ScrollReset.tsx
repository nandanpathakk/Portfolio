"use client";

import { useEffect } from "react";

export default function ScrollReset() {
    useEffect(() => {
        // Disable scroll restoration
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        // Remove any hash from URL to prevent anchor scrolling
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }

        // Reset scroll position immediately
        const resetScroll = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        resetScroll();

        // Additional reset after a microtask to catch any late scrolls
        Promise.resolve().then(() => {
            resetScroll();
        });

        // Prevent scroll on focus (in case autoFocus causes scrolling)
        const preventScrollOnFocus = (e: FocusEvent) => {
            if (document.documentElement.scrollTop !== 0 || document.body.scrollTop !== 0) {
                resetScroll();
            }
        };

        // Listen for focus events briefly to catch any focus-based scrolling
        window.addEventListener("focus", preventScrollOnFocus, { once: true, passive: false });
        
        // Cleanup
        return () => {
            window.removeEventListener("focus", preventScrollOnFocus);
        };
    }, []);

    return null;
}
