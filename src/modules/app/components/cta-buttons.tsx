import ButtonLink from "@/components/ui/button-link";
import { cn } from "@/utils/classNames";
import { Send } from "lucide-react";
import type { ComponentProps } from "react";

export type CTAButtonsProps = ComponentProps<"div">;

const CTAButtons = ({ className, ...props }: CTAButtonsProps) => (
  <div
    className={cn(
      "flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center",
      className,
    )}
    {...props}
  >
    <ButtonLink href="/schedule" variant="gradient" className="w-full">
      Book a 15-min call
      <Send aria-hidden className="size-4" />
    </ButtonLink>
    <ButtonLink href="/#contact" className="w-full">
      Get started
    </ButtonLink>
  </div>
);

export default CTAButtons;
