import type { NextConfig } from "next";

const nextConfig: NextConfig = { 
   experimental: {
    // turbo: false, // 👈 disables Turbopack
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
      }, {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },{
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      }, {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      }, {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }, {
        protocol: 'https',
        hostname: 'www.pexels.com',
      }, {
        protocol: 'https',
        hostname: 'tailwindui.com',
      }
    ],
  },
};

export default nextConfig;
