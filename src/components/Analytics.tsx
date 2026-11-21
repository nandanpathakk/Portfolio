"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
    GA_ID,
    OPEN_SETTINGS_EVENT,
    analyticsEnabled,
    clearAnalyticsCookies,
    privacySignal,
    readConsent,
    saveConsent,
    track,
    type Consent,
} from "@/lib/analytics";

/**
 * Loads Google Analytics after consent, and shows the consent banner.
 *
 * - Nothing from Google loads until the visitor presses Allow.
 * - Visitors whose browser sends Global Privacy Control are treated as a "no"
 *   and never see the banner.
 * - The choice is remembered on this device; "Analytics settings" in the
 *   footer reopens the banner, and saying no later clears the GA cookies.
 * - Links with a data-track="event_name" attribute are counted when clicked
 *   (extra data-track-* attributes become event parameters).
 */
export default function Analytics() {
    const [consent, setConsent] = useState<Consent | null>(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        if (!analyticsEnabled) return;
        const saved = readConsent();
        if (saved) {
            setConsent(saved);
        } else if (privacySignal()) {
            setConsent("denied");
        } else {
            setShowBanner(true);
        }
        const reopen = () => setShowBanner(true);
        window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
        return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
    }, []);

    // Count clicks on links marked with data-track, once analytics is allowed.
    useEffect(() => {
        if (consent !== "granted") return;
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
    }, [consent]);

    const choose = (value: Consent) => {
        const before = consent;
        saveConsent(value);
        setConsent(value);
        setShowBanner(false);
        if (value === "denied" && before === "granted") {
            const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
            gtag?.("consent", "update", { analytics_storage: "denied" });
            clearAnalyticsCookies();
            // Reload so the Google tag is gone from the page entirely.
            window.location.reload();
        }
    };

    if (!analyticsEnabled) return null;

    return (
        <>
            {consent === "granted" && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
                    <Script id="ga-init" strategy="afterInteractive">
                        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
gtag('consent', 'update', { analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${GA_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });`}
                    </Script>
                </>
            )}

            {showBanner && (
                <div
                    role="dialog"
                    aria-label="Analytics"
                    aria-live="polite"
                    className="fixed bottom-[max(14px,env(safe-area-inset-bottom))] left-[var(--gutter)] right-[calc(var(--gutter)+64px)] z-[70] max-w-md rounded-2xl bg-[#0b0a0e]/95 p-4 text-cream shadow-[0_12px_34px_-12px_rgb(0_0_0/0.8)] ring-1 ring-white/10 backdrop-blur-md sm:right-auto sm:p-5"
                >
                    <p className="text-[0.95rem] leading-snug">
                        Can I use Google Analytics to count visits and see which projects get read? No ads,
                        and nothing that identifies you.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" onClick={() => choose("granted")} className="btn btn-accent min-h-10 px-4 py-2 text-sm">
                            Allow
                        </button>
                        <button type="button" onClick={() => choose("denied")} className="btn btn-line min-h-10 px-4 py-2 text-sm">
                            No thanks
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
