"use client";

import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { cn } from "@/utils";
import { toast } from "sonner";
import { X, Send, Loader } from "lucide-react";
import Portal from "@/components/helpers/Portal";
import { getMessage } from "@/modules/chatbot/server/actions";
import { MotionDiv, MotionMain } from "@/components/helpers/dynamic/Motion";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface ChatHistoryProps {
  readonly content?: string;
  readonly user: "Bot" | "User";
  readonly createdAt?: string;
}

const ChatModal: FC<
  ComponentProps<typeof MotionMain> & {
    readonly handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }
> = ({ handleClick, ...props }) => {
  const [history, setHistory] = useState<ChatHistoryProps[]>([]);
  const [message, setMessage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!message) {
      return;
    }

    const handleReponse = async () => {
      try {
        // Invoke async function and get ai bot response
        const content = await getMessage(message);

        // Null check content
        if (!content) {
          setIsLoading(false);
          return;
        }

        // Append chat history to existing state
        setHistory((prev) => [
          ...prev,
          {
            user: "Bot",
            content,
            createdAt: new Date().toLocaleTimeString(),
          },
        ]);
      } catch (err) {
        // Log error to client for debugging
        console.log(err);
      } finally {
        // Set loading state to false regardless if success or not
        setIsLoading(false);
      }
    };

    handleReponse();
  }, [message]);

  const handleSubmit = (formData: FormData) => {
    // Null check formData
    if (!formData) {
      toast.error("Please fill out the input field");
      return;
    }

    // Get message from form data
    const message = String(formData.get("message"));

    if (!message) {
      toast.error("Please type in your message");
      return;
    }

    // Append user chat message to history;
    setHistory((prev) => [
      ...prev,
      {
        user: "User",
        content: message,
        createdAt: new Date().toLocaleTimeString(),
      },
    ]);

    chatBodyRef.current?.scrollTo({
      behavior: "smooth",
      top: chatBodyRef.current.scrollHeight,
    });

    // Set loading state
    setIsLoading(true);

    // Trigger useEffect to get ai request based on message
    setMessage(message);
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      behavior: "smooth",
      top: chatBodyRef.current.scrollHeight,
    });
  }, [isLoading]);

  // Improved MarkdownMessage component
  const MarkdownMessage = ({ content }: { content: string }) => {
    if (!content) return null;

    return (
      <div className="markdown-wrapper">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
          components={{
            // Override default components to ensure proper styling
            ul: ({ node, ...props }) => (
              <ul className="list-disc ml-5 my-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal ml-5 my-2" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
            h1: ({ node, ...props }) => (
              <h1 className="text-xl font-bold my-2" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-lg font-bold my-2" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-md font-bold my-2" {...props} />
            ),
            pre: ({ node, ...props }) => (
              <pre className="my-2 overflow-x-auto" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <Portal>
      <MotionMain
        {...props}
        className="fixed bottom-0 right-0 z-[150] bg-neutral-50 dark:bg-neutral-900 rounded-md max-w-sm w-full"
      >
        <div className="flex items-center justify-between gap-6 bg-neutral-100 dark:bg-neutral-900 rounded-md p-4">
          <section className="flex items-center gap-2">
            <div>
              <h1 className="font-medium">MorlaX</h1>
              <div className="flex items-center gap-2">
                <div className="bg-green-400 block w-2 h-2 rounded-full" />
                <p className="text-xs opacity-60">Online</p>
              </div>
            </div>
          </section>

          <button
            onClick={handleClick}
            className="rounded-full p-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-800 transition-all"
          >
            <X />
          </button>
        </div>
        <section
          ref={chatBodyRef}
          className="relative max-h-96 min-h-96 overflow-y-auto p-4 flex flex-col gap-6"
        >
          <p className="flex items-center text-sm opacity-60 text-center before:block before:relative before:mx-4 after:mx-4 before:left-0 before:w-full before:h-px before:bg-neutral-200 after:block after:relative after:left-0 after:w-full after:h-px after:bg-neutral-200">
            {new Date().toLocaleDateString()}
          </p>
          <div className="flex flex-col items-start max-w-fit">
            <p className="text-sm opacity-60">
              <span>OliverMorlaX Bot</span>
            </p>
            <p className="p-2 bg-neutral-200 dark:bg-neutral-800 rounded-md inline-block">
              <MarkdownMessage content="Hello, how can I help you today? I'm here to assist you with your questions and concerns." />
            </p>
            <p className="text-sm opacity-60 ml-auto">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
          {/* Append chat history below */}
          {history.map((message, index) => (
            <MotionDiv
              key={index}
              className={cn(
                "flex flex-col max-w-72 w-fit",
                message.user === "User" ? "ml-auto" : "mr-auto"
              )}
            >
              <p
                className={cn(
                  "text-sm opacity-60",
                  message.user === "User" ? "text-end" : "mr-auto"
                )}
              >
                {message.user}
              </p>
              <div
                className={cn(
                  "p-2 bg-neutral-200 dark:bg-neutral-800 rounded-md inline-block w-fit",
                  message.user === "User" ? "ml-auto" : "mr-auto"
                )}
              >
                {message.user === "Bot" ? (
                  <MarkdownMessage content={message.content || ""} />
                ) : (
                  message.content
                )}
              </div>
              <p
                className={cn(
                  "text-sm opacity-60",
                  message.user === "User" ? "mr-auto" : "ml-auto"
                )}
              >
                {message.createdAt}
              </p>
            </MotionDiv>
          ))}
          {isLoading && (
            <MotionDiv className={cn("flex flex-col max-w-72 w-fit mr-auto")}>
              <p className="text-sm opacity-60">
                <span>OliverMorlaX Bot</span>
              </p>
              <p className="p-2 bg-neutral-200 dark:bg-neutral-900 rounded-md inline-block w-fit">
                <Loader className="animate-spin w-4 h-4" />
              </p>
              <p className={cn("text-sm opacity-60 ml-auto")}>
                {new Date().toLocaleTimeString()}
              </p>
            </MotionDiv>
          )}
        </section>
        <div className="border-t border-t-neutral-200 dark:border-t-neutral-800 relative flex flex-col items-center gap-2 p-4">
          <form
            action={handleSubmit}
            className="flex items-center gap-2 w-full"
          >
            <input
              required
              autoFocus
              type="text"
              name="message"
              className="rounded-md px-4 py-2 w-full transition-all focus:outline-none focus:ring-1 focus:ring-blue-400 dark:focus:ring-neutral-700 appearance-none border border-neutral-200 dark:border-neutral-800"
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              className="rounded-full p-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-800 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div>
            <p>
              You can also call me at{" "}
              <a href="tel:+9175644906" className="font-medium">
                (347) 302-0492
              </a>
            </p>
          </div>
        </div>
      </MotionMain>
    </Portal>
  );
};

export default ChatModal;
