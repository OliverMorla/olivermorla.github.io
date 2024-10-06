import React from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/helpers/Icon";
import AnimatedInViewDiv, {
  type AnimatedInViewDivProps,
} from "@/components/helpers/AnimatedInViewDiv";
import type { MotionProps } from "framer-motion";
import type { FaPresetIconsTypes } from "@/constants";

interface TextWithIconProps extends AnimatedInViewDivProps {
  readonly text: string;
  readonly faIcon: FaPresetIconsTypes;
  readonly iconClassName?: string;
  readonly textClassName?: string;
}

const TextWithIcon = React.forwardRef<
  HTMLDivElement,
  TextWithIconProps & MotionProps
>(
  (
    { faIcon, text, className, iconClassName, textClassName, ...props },
    ref
  ) => {
    return (
      <AnimatedInViewDiv
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <Icon faIcon={faIcon} className={iconClassName} />
        <p className={textClassName}>{text}</p>
      </AnimatedInViewDiv>
    );
  }
);

TextWithIcon.displayName = "TextWithIcon";

export default TextWithIcon;
