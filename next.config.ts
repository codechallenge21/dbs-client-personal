import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const domains = process.env.IMAGE_DOMAINS
  ? process.env.IMAGE_DOMAINS.split(",")
  : [];

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    taint: true,
  },
  images: {
    domains: [...domains, "icons.iconarchive.com"],
  },
  i18n: {
    locales: ['zh-TW'],
    defaultLocale: 'zh-TW',
    localeDetection: false
  },
};

const dev = {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_PROXY_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Language",
            value: "zh-TW"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
        ],
      }
    ];
  },
  ...nextConfig,
};

const prod = {
  assetPrefix: process.env.ASSET_PREFIX,
  ...nextConfig,
};

module.exports = isProd ? prod : dev;

export default nextConfig;
