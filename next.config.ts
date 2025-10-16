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
  // 子路径部署配置 - 只在生产环境生效
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/carcontant',
    assetPrefix: '/carcontant',
  }),
};

export default nextConfig;
