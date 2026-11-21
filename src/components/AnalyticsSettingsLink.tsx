"use client";

import { analyticsEnabled, openAnalyticsSettings } from "@/lib/analytics";

/** "Analytics settings" in the footer: reopens the consent banner. Hidden when analytics is off. */
export default function AnalyticsSettingsLink({ className = "" }: { className?: string }) {
    if (!analyticsEnabled) return null;
    return (
        <button type="button" onClick={openAnalyticsSettings} className={`link ${className}`}>
            Analytics settings
        </button>
    );
}
