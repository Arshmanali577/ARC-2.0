import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deployed on Vercel: no adapter or output mode needed — the platform
  // detects Next.js and builds this as-is.
  images: {
    // Add hostnames here if photography is served from a CMS or Vercel Blob.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
