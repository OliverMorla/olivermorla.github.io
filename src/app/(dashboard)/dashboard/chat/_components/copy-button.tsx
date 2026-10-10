"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  getText: () => string;
  label?: string;
  className?: string;
};

const icon = {
  initial: { opacity: 0, scale: 0.6, filter: "blur(2px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.6, filter: "blur(2px)" },
  transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] as const },
};

/** Copy with a check that confirms it, then settles back after a moment. */
export default function CopyButton({
  getText,
  label = "Copy",
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
    } catch {
      // Clipboard blocked; nothing to confirm.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      title={label}
      className={`grid size-7 place-items-center rounded-md text-muted transition-[color,background-color,opacity] hover:bg-grid hover:text-ink active:scale-[0.94] ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {copied ? (
          <motion.span key="check" {...icon}>
            <Check aria-hidden="true" className="size-3.5 text-up" />
          </motion.span>
        ) : (
          <motion.span key="copy" {...icon}>
            <Copy aria-hidden="true" className="size-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
