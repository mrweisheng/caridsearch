import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'djlfajk23a.28car.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
