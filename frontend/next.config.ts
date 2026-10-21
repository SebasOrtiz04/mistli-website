import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "imgs.search.brave.com",
      // }
    ]
  }
};

export default nextConfig;
