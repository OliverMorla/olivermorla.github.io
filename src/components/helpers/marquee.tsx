import { cn } from "@/utils/classNames";
import type { ComponentProps } from "react";

type MarqueeProps = ComponentProps<"div"> & {
  /** Pause while hovered or while a link inside has focus. */
  pauseOnHover?: boolean;
  reverse?: boolean;
  /** Copies rendered back to back so the loop never shows a gap. */
  repeat?: number;
};

/**
 * CSS-only infinite marquee. Only the first copy is exposed to assistive tech
 * and the tab order; the clones exist purely to fill the loop.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        className,
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          inert={i > 0}
          className={cn(
            "flex shrink-0 animate-marquee flex-row justify-around [gap:var(--gap)]",
            pauseOnHover &&
              "group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
