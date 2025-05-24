import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
   experimental: {
    // turbo: false, // 👈 disables Turbopack
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains (be cautious)
      },
      {
        protocol: 'http',
        hostname: '**', // Allow all HTTP domains (not recommended for production)
      }
    ],}
  };

export default nextConfig;
