import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-us-west-2.amazonaws.com",
        pathname: "/issuewireassets/**",
      },
    ],
  },
};

export default nextConfig;
