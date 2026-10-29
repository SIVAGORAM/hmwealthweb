import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Lets phones on the same Wi-Fi load the dev server (dev only, no effect on production).
  allowedDevOrigins: ["192.168.0.106"],
  images: {
    // Photos are from Unsplash (free for commercial use under the Unsplash License).
    // A custom loader lets the browser fetch them straight from Unsplash's CDN.
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
  },
};

export default nextConfig;
