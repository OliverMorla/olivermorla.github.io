import { withPayload } from "@payloadcms/next/withPayload";
import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";

const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const posthogAssetHost = posthogHost.replace("us.i.posthog.com", "us-assets.i.posthog.com").replace("eu.i.posthog.com", "eu-assets.i.posthog.com");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ihcntrkzhwqeiajreqfp.supabase.co",
      }
    ]
  },
  serverExternalPackages: ["sharp"],
  experimental: {
    optimizePackageImports: [
      "@fortawesome/react-fontawesome",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-regular-svg-icons",
    ],
  },
  // Reverse-proxy PostHog through /ingest so tracking blockers don't intercept it.
  // https://posthog.com/docs/advanced/proxy/nextjs
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${posthogAssetHost}/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default withPayload(withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "oliver-morla",

  project: "portfolio-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true
}));