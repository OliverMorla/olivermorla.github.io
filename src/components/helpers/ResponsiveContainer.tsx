import { cn } from "@/lib/utils";
import React from "react";

type ResponsiveContainerType = "div" | "main" | "section";
type ResponsiveContainerProps<T extends ResponsiveContainerType> = {
  readonly children: React.ReactNode;
  readonly type?: T;
} & React.ComponentPropsWithoutRef<"div">;

const ResponsiveContainer = React.forwardRef<
  HTMLDivElement,
  ResponsiveContainerProps<ResponsiveContainerType>
>(({ children, className, type = "div", ...props }, ref) => {
  const Element = type;
  return (
    <Element
      ref={ref}
      className={cn("container mx-auto", className)}
      {...props}
    >
      {children}
    </Element>
  );
});

ResponsiveContainer.displayName = "ResponsiveContainer";

export default ResponsiveContainer;
