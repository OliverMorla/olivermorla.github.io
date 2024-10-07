import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundLinesProps extends React.ComponentPropsWithoutRef<"div"> {
  readonly numberOfLines?: number;
  readonly lineClassName?: string;
}

const BackgroundLines = React.forwardRef<HTMLDivElement, BackgroundLinesProps>(
  ({ numberOfLines, className, lineClassName, ...props }, ref) => {
    const lines = Array.from({ length: numberOfLines || 5 }, (_, index) => index + 1);
    return (
      <div
        ref={ref}
        className={cn(
          "fixed flex justify-evenly w-full h-full top-0 left-0 opacity-5 pointer-events-none select-none z-0",
          className
        )}
        {...props}
      >
        {lines.map((item) => (
          <span
            key={item}
            className={cn("w-[1px] h-full bg-neutral-700 dark:bg-neutral-200", lineClassName)}
          ></span>
        ))}
      </div>
    );
  }
);

BackgroundLines.displayName = "BackgroundLines";

export default BackgroundLines;
