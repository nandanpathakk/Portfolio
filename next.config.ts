import type { NextConfig } from "next";

const devCsp = `
  default-src 'self' http://localhost:3000 http://192.168.2.2:3000;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' http://localhost:3000 http://192.168.2.2:3000;
  style-src 'self' 'unsafe-inline' http://localhost:3000 http://192.168.2.2:3000;
  img-src 'self' blob: data: https://cdn.simpleicons.org;
  font-src 'self';
  connect-src 'self' ws://localhost:3000 ws://192.168.2.2:3000;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const prodCsp = `
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self' blob: data: https://cdn.simpleicons.org;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const isDev = process.env.NODE_ENV === 'development';

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
            value: (isDev ? devCsp : prodCsp).replace(/\n/g, ''),
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
        ],
      },
    ];
  },
};

export default nextConfig;
