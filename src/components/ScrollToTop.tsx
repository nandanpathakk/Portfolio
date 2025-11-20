"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
    useEffect(() => {
        // Only run on client side
        if (typeof window !== 'undefined') {
            // Scroll to top on mount
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

            // Also handle browser back/forward
            const handleRouteChange = () => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            };

            window.addEventListener('popstate', handleRouteChange);

            return () => {
                window.removeEventListener('popstate', handleRouteChange);
            };
        }
    }, []);

    return null;
}
