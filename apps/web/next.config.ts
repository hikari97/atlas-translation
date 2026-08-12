import type { NextConfig } from "next";
import { fileURLToPath } from 'node:url';

const monorepoRoot = fileURLToPath(new URL('../..', import.meta.url));

const legacyDashboardRoutes = [
  '/dashboard/projects/:path*',
  '/dashboard/translate/:path*',
  '/dashboard/library/:path*',
  '/dashboard/ai-jobs/:path*',
  '/dashboard/export/:path*',
  '/dashboard/settings/:path*',
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: monorepoRoot,
  },
  async headers() {
    return [
      {
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
        source: '/auth/:path*',
      },
      {
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
        source: '/dashboard/:path*',
      },
      {
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
        source: '/editor/:path*',
      },
      {
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
        source: '/api/:path*',
      },
    ];
  },
  async redirects() {
    return [
      ...legacyDashboardRoutes.map((source) => ({
        destination: '/dashboard/images',
        permanent: false,
        source,
      })),
    ];
  },
};

export default nextConfig;
