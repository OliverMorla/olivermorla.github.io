"use client";

import { useRef, type ComponentProps } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import CopyButton from "./copy-button";

// No rehype-raw: raw HTML in a model's answer is shown as text, never
// rendered.

function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  return (
    <div className="group/code relative">
      <pre ref={ref} {...props}>
        {children}
      </pre>
      <CopyButton
        getText={() => ref.current?.innerText ?? ""}
        label="Copy code"
        className="absolute top-2 right-2 bg-surface opacity-0 ring-1 ring-line group-hover/code:opacity-100 focus-visible:opacity-100 max-sm:opacity-100"
      />
    </div>
  );
}

const components: Components = {
  pre: ({ node: _node, ...props }) => <CodeBlock {...props} />,
  a: ({ node: _node, ...props }) => (
    <a {...props} target="_blank" rel="noreferrer noopener" />
  ),
  table: ({ node: _node, ...props }) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
};

export default function Markdown({ children }: { children: string }) {
  return (
    <div
      className={[
        "chat-prose prose max-w-none text-[0.9375rem] leading-[1.7]",
        "prose-p:my-3 prose-headings:tracking-[-0.01em] prose-headings:font-semibold",
        "prose-a:underline-offset-4 prose-a:decoration-line hover:prose-a:decoration-ink",
        "prose-li:my-1 prose-hr:my-6",
        "prose-code:rounded prose-code:bg-grid prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:rounded-xl prose-pre:bg-page prose-pre:text-ink prose-pre:ring-1 prose-pre:ring-line prose-pre:text-[0.8125rem] prose-pre:leading-relaxed",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-normal",
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
      ].join(" ")}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
