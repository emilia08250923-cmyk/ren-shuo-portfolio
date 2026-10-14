import type { NextConfig } from "next";
const nextConfig: NextConfig = { ...(process.env.GITHUB_PAGES === "1" ? { basePath: "/ren-shuo-portfolio", trailingSlash: true } : {}), images: { deviceSizes: [640, 960, 1440, 1920], imageSizes: [], formats: ["image/webp"] } };
export default nextConfig;
