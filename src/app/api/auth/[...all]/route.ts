import { isAuthConfigured, loadAuth } from "@/lib/auth-session";

// Better Auth's endpoints (/api/auth/*). Until the auth env is set, they
// answer 503 instead of failing to start.
async function handler(request: Request) {
  if (!isAuthConfigured) {
    return Response.json(
      { message: "Sign-in isn't configured on this deployment." },
      { status: 503 },
    );
  }
  const auth = await loadAuth();
  return auth.handler(request);
}

export { handler as GET, handler as POST };
