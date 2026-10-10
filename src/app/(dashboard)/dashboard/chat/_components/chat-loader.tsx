"use client";

import dynamic from "next/dynamic";

// Chats live in localStorage, which the server can't see. Rendering the chat
// only in the browser lets it read storage on the first render, with no
// empty flash and no hydration mismatch.
const Chat = dynamic(() => import("./chat"), {
  ssr: false,
  loading: () => <div className="flex-1" aria-busy="true" />,
});

export default function ChatLoader({ userId }: { userId: string }) {
  return <Chat userId={userId} />;
}
