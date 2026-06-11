import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedRoutes: false,
  },
  reactCompiler: true,
};

export default nextConfig;
