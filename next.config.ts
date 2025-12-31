import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/invest-game',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
