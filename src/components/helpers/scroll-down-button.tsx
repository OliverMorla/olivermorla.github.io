import { cn } from "@/utils/classNames";
import { Mouse } from "lucide-react";
import { ComponentProps } from "react";

interface ScrollDownButtonProps extends ComponentProps<"a"> {
  readonly containerId: string;
}

const ScrollDownButton = ({
  containerId,
  className,
  ...props
}: ScrollDownButtonProps) => {
  return (
    <a
      href={`#${containerId}`}
      className={cn(
        "text-orange-300/75 hover:text-orange-400/75 active:text-orange-500/75 text-center text-nowrap flex flex-col items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <p className="text-xs font-light">Scroll Down</p>
      <Mouse className="size-4 animate-bounce" />
    </a>
  );
};

export default ScrollDownButton;
