import { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Your Next.js config here
  experimental: {
    reactCompiler: false,
    optimizePackageImports: [
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "motion",
      "lucide-react",
    ],
  },

  // Add your domains here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ihcntrkzhwqeiajreqfp.supabase.co",
        pathname: "/storage/v1/object/public/olivermorlax-bucket/public/media/**",
      },
    ],
  },
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  })(nextConfig)
);
