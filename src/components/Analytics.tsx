"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA_ID, analyticsEnabled, privacySignal, track } from "@/lib/analytics";

/**
 * Loads Google Analytics 4 on every visit in production builds.
 *
 * - No consent banner: this is a personal portfolio and analytics runs by default.
 * - Google signals and ad personalisation are off, so data is used for counts only.
 * - Visitors whose browser sends Global Privacy Control are not tracked.
 * - Links with a data-track="event_name" attribute are counted when clicked
 *   (extra data-track-* attributes become event parameters).
 */
export default function Analytics() {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (analyticsEnabled && !privacySignal()) setLoad(true);
    }, []);

    useEffect(() => {
        if (!load) return;
        const onClick = (event: MouseEvent) => {
            const el = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
            if (!el) return;
            const params: Record<string, string> = {};
            for (const [key, value] of Object.entries(el.dataset)) {
                if (key.startsWith("track") && key !== "track" && value) {
                    params[key.slice(5).replace(/^./, (c) => c.toLowerCase())] = value;
                }
            }
            track(el.dataset.track!, params);
        };
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [load]);

    if (!load) return null;

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
            </Script>
        </>
    );
}
