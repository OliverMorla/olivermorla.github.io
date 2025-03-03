"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "@/modules/chatbot/ui/components/chat-modal";

const Chat = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  // Toggle Chat Modal
  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <aside>
      <button
        onClick={handleClick}
        className="cursor-pointer fixed bottom-0 right-0 m-4 z-[150] bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-900 rounded-full transition-colors p-2"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      {/* Chat Modal */}
      {showModal && <ChatModal handleClick={handleClick} />}
    </aside>
  );
};

export default Chat;
