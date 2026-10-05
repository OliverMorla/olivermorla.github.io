import { withPayload } from "@payloadcms/next/withPayload";
import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const posthogAssetHost = posthogHost
  .replace("us.i.posthog.com", "us-assets.i.posthog.com")
  .replace("eu.i.posthog.com", "eu-assets.i.posthog.com");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // SAMEORIGIN keeps Payload's live preview (which frames the site) working.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  compiler: {
    // Strips the Sentry SDK's internal debug logging from bundles. Sentry's
    // own `disableLogger` option only applies to webpack builds.
    define: { __SENTRY_DEBUG__: false },
  },
  experimental: {
    // Branded 404 for unmatched URLs across the app's multiple root layouts
    // (see src/app/global-not-found.tsx).
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ihcntrkzhwqeiajreqfp.supabase.co",
      },
    ],
    localPatterns: [
      {
        pathname: "/api/*/file/**",
      },
      {
        pathname: "/assets/**",
        search: "",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // The /preview/orbit redesign became the home page.
  async redirects() {
    return [{ source: "/preview/orbit", destination: "/", permanent: true }];
  },
  // PostHog reverse proxy (https://posthog.com/docs/advanced/proxy/nextjs).
  // The asset routes must come before the catch-all: rewrites run in order.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `${posthogAssetHost}/static/:path*`,
      },
      {
        source: "/ingest/array/:path*",
        destination: `${posthogAssetHost}/array/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
  // Required by the PostHog reverse proxy above.
  skipTrailingSlashRedirect: true,
};

export default withPayload(
  withSentryConfig(nextConfig, {
    org: "oliver-morla",
    project: "portfolio-nextjs",
    silent: !process.env.CI,
    widenClientFileUpload: true,
  }),
);
