import { databaseUrl } from "@/lib/database-url";
import config from "@payload-config";
import { getPayload } from "payload";

/**
 * True when the CMS database is configured. Lets the site render without CMS
 * content in environments that have no database (e.g. a local build without
 * `.env`), while real query failures still throw so ISR keeps serving the
 * last good page instead of caching a degraded one.
 */
export const isCmsConfigured = Boolean(databaseUrl);

// getPayload caches the initialized instance internally, so this is cheap to
// call per query and avoids connecting to the database at import time.
export const getPayloadClient = () => getPayload({ config });
