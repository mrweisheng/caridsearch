import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 图片配置
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
