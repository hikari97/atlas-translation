import type { NextConfig } from "next";

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
