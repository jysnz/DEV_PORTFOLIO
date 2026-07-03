import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "njzeuginhitfpqoxfnns.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Cache optimized images for 30 days (in seconds)
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
