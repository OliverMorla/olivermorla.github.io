// Shared by the client, server and edge Sentry configs so sampling stays in sync.
export const sentryOptions = {
  dsn: "https://de483d4544a2884d40637628bd14b474@o4509924450500608.ingest.us.sentry.io/4509924479533057",
  // Full tracing in development, a 10% sample in production to keep quota in check.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  debug: false,
};
