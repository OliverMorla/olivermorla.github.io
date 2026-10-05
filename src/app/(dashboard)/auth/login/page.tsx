import { getSession, isAuthConfigured } from "@/lib/auth-session";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

// Only same-site paths, so `next` can't bounce a signed-in user elsewhere.
const safeNext = (value: unknown) =>
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/dashboard";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next);
  const forbidden = params.error === "forbidden";

  const session = await getSession();
  if (session?.user.role === "admin") redirect(next);

  return (
    <main className="grid min-h-svh place-items-center px-4 py-12">
      <div className="w-full max-w-[24rem]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to the site
        </Link>

        <div className="mt-5 rounded-2xl bg-surface p-7 shadow-[0_1px_2px_rgb(0_0_0/0.04)] ring-1 ring-line sm:p-8">
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">Sign in</h1>
          <p className="mt-1.5 text-sm text-ink-2">
            The dashboard is for the site owner only.
          </p>

          <LoginForm
            next={next}
            configured={isAuthConfigured}
            signedInWithoutAccess={forbidden && Boolean(session)}
          />
        </div>
      </div>
    </main>
  );
}
