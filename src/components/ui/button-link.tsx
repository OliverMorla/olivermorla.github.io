import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/utils/classNames";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";

export type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "href"> &
  VariantProps<typeof buttonVariants> & { href: string };

/**
 * A link styled as a button. External URLs open in a new tab; the visible
 * text is the accessible name, so no aria-label is injected.
 */
const ButtonLink = ({
  padding,
  width,
  shadow,
  variant,
  rounded,
  fontSize,
  className,
  href,
  ...props
}: ButtonLinkProps) => {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
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
};

export default ButtonLink;
