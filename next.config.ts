import type { NextConfig } from "next";

/**
 * Dual-mode build:
 *  - default: normal Next.js server build (platform preview, /api/health live).
 *  - STATIC_EXPORT=true: zero-config static export for GitHub Pages, e.g.
 *      STATIC_EXPORT=true npm run build   ->  out/  (deploy to gh-pages)
 *    BASE_PATH overrides the repo path (defaults to /portfolio).
 */
const isStatic = process.env.STATIC_EXPORT === "true";
const basePath = process.env.BASE_PATH || "/portfolio";

const nextConfig: NextConfig = {
  output: isStatic ? "export" : undefined,
  basePath: isStatic ? basePath : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
