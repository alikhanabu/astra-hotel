import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  async rewrites() {
    return [];
  },
};

export default nextConfig;
