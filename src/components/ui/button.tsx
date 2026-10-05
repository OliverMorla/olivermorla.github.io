import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/utils/classNames";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

export { buttonVariants };

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  padding,
  width,
  shadow,
  variant,
  rounded,
  fontSize,
  className,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      buttonVariants({
        variant,
        padding,
        shadow,
        rounded,
        width,
        fontSize,
      }),
      className,
    )}
    {...props}
  />
);

export default Button;
