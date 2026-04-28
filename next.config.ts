import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  allowedDevOrigins: ["192.168.68.60"],
  trailingSlash: false,
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    inlineCss: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
};

export default withNextIntl(config);
