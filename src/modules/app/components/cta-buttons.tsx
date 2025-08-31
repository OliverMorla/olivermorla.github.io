import { ComponentProps } from "react";
import { cn } from "@/utils/classNames";
import ButtonLink from "@/components/ui/button-link";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export type CTAButtonsProps = ComponentProps<"div">;

const CTAButtons = ({ className, ...props }: CTAButtonsProps) => {
  return (
    <div
      className={cn("flex items-center gap-6 max-sm:flex-col", className)}
      {...props}
    >
      <ButtonLink href="/schedule" variant="gradient" className="max-sm:w-full">
        Book a 15-min Call
        <Icon icon={faPaperPlane} width={16} height={16} size="xs" />
      </ButtonLink>
      <ButtonLink href="/#contact" className="max-sm:w-full">
        Get Started
        {/* <Icon icon={faArrowRight} width={16} height={16} size="xs" /> */}
      </ButtonLink>
    </div>
  );
};

export default CTAButtons;
