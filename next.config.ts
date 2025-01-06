import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
