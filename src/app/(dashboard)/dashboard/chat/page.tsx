import { requireChatAccess } from "@/lib/auth-session";
import { isLlmConfigured } from "@/lib/llm";
import type { Metadata } from "next";
import DashboardHeader from "../_components/dashboard-header";
import ChatLoader from "./_components/chat-loader";

export const metadata: Metadata = { title: "Chat" };

export default async function ChatPage() {
  const { session, access } = await requireChatAccess("/dashboard/chat");

  return (
    <div className="flex h-dvh flex-col">
      <DashboardHeader
        email={session.user.email}
        userId={session.user.id}
        access={access}
        wide
      />
      {isLlmConfigured ? (
        <ChatLoader userId={session.user.id} />
      ) : (
        <main className="grid flex-1 place-items-center px-4">
          <div className="max-w-sm text-center">
            <h1 className="text-xl font-semibold tracking-[-0.02em]">
              Chat isn&apos;t set up
            </h1>
            <p className="mt-2 text-sm text-ink-2">
              Add <code className="font-mono text-ink">LLM_API_BASE_URL</code>{" "}
              to this deployment to connect the model server.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}
