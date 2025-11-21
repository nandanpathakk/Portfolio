"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
    const handleRouteChange = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            handleRouteChange();

            window.addEventListener('popstate', handleRouteChange);

            return () => {
                window.removeEventListener('popstate', handleRouteChange);
            };
        }
    }, []);

    return null;
}
