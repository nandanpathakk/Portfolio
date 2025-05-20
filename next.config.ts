import type { NextConfig } from "next";
import { headers } from "next/headers";

const cspHeader = `
    default-src 'self' http://192.168.29.229:3000;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' http://192.168.29.229:3000;;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://cdn.simpleicons.org;
    font-src 'self';
    connect-src 'self' ws://192.168.29.229:3000;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.simpleicons.org'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
        ],
      },
    ]
  }
};

export default nextConfig;
