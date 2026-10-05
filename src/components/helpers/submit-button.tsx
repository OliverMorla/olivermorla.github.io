"use client";

import Button, { type ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils/classNames";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export type SubmitButtonProps = Omit<ButtonProps, "type"> & {
  loaderText?: string;
  loaderClassName?: string;
};

/** Submit button that reflects the pending state of its parent <form>. */
const SubmitButton = ({
  children,
  className,
  loaderClassName,
  loaderText,
  disabled,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      aria-busy={pending}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      {pending ? (
        <>
          {loaderText && <span>{loaderText}</span>}
          <LoaderCircle
            aria-hidden
            className={cn("size-4 motion-safe:animate-spin", loaderClassName)}
          />
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
