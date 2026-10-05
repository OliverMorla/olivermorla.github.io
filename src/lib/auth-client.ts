import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Same-origin, so no baseURL: requests go to /api/auth on whichever host
// served the page.
export const authClient = createAuthClient({
  plugins: [adminClient()],
});
