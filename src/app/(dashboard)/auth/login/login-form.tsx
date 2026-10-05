"use client";

import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Props = {
  next: string;
  configured: boolean;
  signedInWithoutAccess: boolean;
};

const field =
  "mt-1.5 block h-11 w-full rounded-lg bg-page px-3.5 text-[0.9375rem] text-ink ring-1 ring-line outline-none transition-shadow placeholder:text-muted focus:ring-2 focus:ring-series-1 disabled:opacity-60";

export default function LoginForm({
  next,
  configured,
  signedInWithoutAccess,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(
    !configured
      ? "Sign-in isn't set up on this deployment yet."
      : signedInWithoutAccess
        ? "This account doesn't have access to the dashboard."
        : null,
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setPending(true);
    setError(null);

    const { error } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    if (error) {
      setPending(false);
      // One message for every credential failure, so the form can't be used
      // to find out which emails have accounts.
      setError(
        error.status === 429
          ? "Too many attempts. Wait a minute and try again."
          : error.status === 401 || error.status === 400
            ? "That email and password don't match."
            : "Couldn't sign in right now. Try again in a moment.",
      );
      return;
    }

    // The page re-checks the session server-side (and the role) on arrival.
    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          disabled={!configured || pending}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            disabled={!configured || pending}
            className={`${field} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((shown) => !shown)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 mt-1.5 grid w-11 place-items-center rounded-r-lg text-muted transition-colors hover:text-ink"
          >
            {showPassword ? (
              <EyeOff aria-hidden="true" className="size-[1.125rem]" />
            ) : (
              <Eye aria-hidden="true" className="size-[1.125rem]" />
            )}
          </button>
        </div>
      </div>

      <p
        role="alert"
        aria-live="polite"
        className={error ? "text-sm text-down" : "sr-only"}
      >
        {error}
      </p>

      <button
        type="submit"
        disabled={!configured || pending}
        className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-ink text-[0.9375rem] font-medium text-page transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending && (
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
        )}
        {pending ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
