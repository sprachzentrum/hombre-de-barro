import type { NextConfig } from "next";

const strapiHost = new URL(
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
);

const nextConfig: NextConfig = {
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
