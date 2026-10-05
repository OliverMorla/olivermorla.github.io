"use client";

/**
 * Feeds the pointer position to every `.spot` card inside it as --x / --y,
 * so neighbouring cards catch the edge of the light too.
 */
export function Spotlight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        for (const card of e.currentTarget.querySelectorAll<HTMLElement>(
          ".spot",
        )) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        }
      }}
    >
      {children}
    </div>
  );
}
