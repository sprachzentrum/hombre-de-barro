import type { NextConfig } from "next";

const strapiHost = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
);

// Production deploy lives under https://deutschmate.de/hombredebarro
// Local dev runs at http://localhost:3000 without a basePath.
const isProd = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH
  ?? (isProd ? "/hombredebarro" : "");

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
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
