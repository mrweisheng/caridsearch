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
  // 子路径部署配置
  basePath: '/carcontant',
  assetPrefix: '/carcontant',
};

export default nextConfig;
