"use client";

import { authClient } from "@/lib/auth-client";
import { clearChats } from "@/lib/chat-storage";
import { LoaderCircle, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const iconButton =
  "grid size-9 place-items-center rounded-lg text-ink-2 ring-1 ring-line transition-colors hover:bg-surface hover:text-ink disabled:opacity-60";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Both icons render and CSS picks one, so the server markup matches.
  return (
    <button
      type="button"
      aria-label="Switch between light and dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={iconButton}
    >
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
    </button>
  );
}

export function SignOutButton({ userId }: { userId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    // Chats live only in this browser; signing out takes them with it.
    clearChats(userId);
    await authClient.signOut();
    router.replace("/auth/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      aria-label="Sign out"
      title="Sign out"
      className={iconButton}
    >
      {pending ? (
        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
      ) : (
        <LogOut aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
