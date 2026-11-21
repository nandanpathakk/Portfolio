/**
 * Google Analytics 4. Loads on every visit (no consent banner), with Google
 * signals and ad personalisation switched off. Visitors whose browser sends
 * Global Privacy Control are not tracked. See <Analytics /> for the loading.
 *
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-ABC123XYZ) to turn it on. With no
 * ID, or outside a production build, nothing loads and track() does nothing.
 */

const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
/** Only a well-formed GA4 ID is accepted, since it is written into a script tag. */
export const GA_ID = /^G-[A-Z0-9]{4,20}$/.test(raw) ? raw : "";
export const analyticsEnabled = GA_ID !== "" && process.env.NODE_ENV === "production";

export const OPEN_SETTINGS_EVENT = "np:analytics-settings";

/** Browsers can send a "don't sell or share my data" signal (Global Privacy Control). We honour it. */
export function privacySignal(): boolean {
    return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

type Params = Record<string, string | number | boolean | undefined>;
type Gtag = (...args: unknown[]) => void;

/**
 * Send one event. Does nothing until the Google tag has loaded. Only short plain values go through: never put names, email
 * addresses or anything a visitor typed into an event.
 */
export function track(name: string, params: Params = {}) {
    if (!analyticsEnabled) return;
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return;
    const clean: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(params)) {
        if (value === undefined) continue;
        clean[key] = typeof value === "string" ? value.slice(0, 100) : value;
    }
    gtag("event", name, clean);
}

/** Remove Google Analytics cookies. Kept for if a consent option comes back. */
export function clearAnalyticsCookies() {
    const host = window.location.hostname;
    const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
    for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (name !== "_ga" && !name.startsWith("_ga_")) continue;
        for (const domain of domains) {
            document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
        }
    }
}

/** Used by <AnalyticsSettingsLink />, which is not on the page while there is no banner. */
export function openAnalyticsSettings() {
    window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
