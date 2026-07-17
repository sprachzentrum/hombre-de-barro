import type { NextConfig } from "next";

const strapiHost = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
);

// Set NEXT_PUBLIC_BASE_PATH explicitly when the site is hosted below a path
// (for example "/hombredebarro"). Root-domain deployments leave it empty.
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  // assetPrefix ensures that built static assets (/_next/static/*)
  // resolve under the same sub-path. Required for the standalone-style
  // deploy behind a reverse proxy.
  assetPrefix: basePath || undefined,
  // Force trailing slash when running under a sub-path so that
  // https://deutschmate.de/hombredebarro/ is canonical (avoids a
  // redirect loop with Cloudflare's slash normalization).
  trailingSlash: !!basePath,
  images: {
    remotePatterns: [
      {
        protocol: strapiHost.protocol.replace(":", "") as "http" | "https",
        hostname: strapiHost.hostname,
        port: strapiHost.port || undefined,
        pathname: "/uploads/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["recharts"],
  },
};

export default nextConfig;
