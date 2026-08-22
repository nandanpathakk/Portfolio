import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * Everything the site loads is same-origin: fonts are self-hosted by
 * next/font at build time, images live in /public, and the only network call
 * is to our own /api/ai-about. So the policy is 'self' plus the two
 * unavoidable exceptions below, and nothing else.
 *
 * The dev-only allowances exist because webpack's hot reloader evaluates code
 * at runtime and talks over a websocket. They must never reach production.
 */
const csp = [
  "default-src 'self'",

  // 'unsafe-inline': Next serves the RSC payload and its bootstrap as inline
  // <script> tags. Removing it requires a per-request nonce from middleware,
  // which would also make every page dynamic — see README notes before
  // trading a fully static site for it.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,

  // 'unsafe-inline': Framer Motion animates through inline style attributes,
  // and Tailwind injects a <style> block. Style injection cannot exfiltrate
  // data the way script injection can.
  "style-src 'self' 'unsafe-inline'",

  // data: is required — the grain texture in globals.css is a data: SVG, and
  // next/image blur placeholders are data: URIs.
  "img-src 'self' blob: data:",

  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",

  // Nothing is embedded, and nothing may embed us.
  "frame-src 'none'",
  "child-src 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",

  // Stop an injected <base> from re-pointing every relative URL, and stop any
  // form from posting off-site.
  "base-uri 'self'",
  "form-action 'self'",

  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },

  // Legacy sibling of frame-ancestors, for older browsers.
  { key: "X-Frame-Options", value: "DENY" },

  // Never let the browser second-guess a declared Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Send the origin cross-site, the full path only to ourselves.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Nothing here needs hardware or location.
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
      "browsing-topics=()",
    ].join(", "),
  },

];

// Two years, subdomains included. Production only: a browser must ignore this
// over plain http anyway, and there is no reason to hand it to localhost.
// Not submitted to the preload list — that is hard to reverse for a custom
// domain, and preload is a separate opt-in.
if (!isDev) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  });
}

const nextConfig: NextConfig = {
  // No remote images are configured on purpose: every image ships in /public.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
