"use client";
import React from "react";
import { cn } from "@/utils";
import { useFormStatus } from "react-dom";
import Icon from "@/components/helpers/Icon";
import Button, { type ButtonProps } from "@/components/shared/ui/Button";

interface SubmitButtonProps extends ButtonProps {
  readonly useTextLoading?: boolean;
  readonly iconClassName?: string;
  readonly loadingText?: string;
}

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      useTextLoading = false,
      loadingText = "Loading...",
      children,
      faPresetIcon,
      iconClassName,
      ...props
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    if (useTextLoading) {
      return (
        <Button
          ref={ref}
          type="submit"
          // If the form is pending, remove the icon if it exists
          {...(pending ? {} : { faPresetIcon })}
          disabled={pending}
          {...props}
        >
          {pending ? loadingText : children}
        </Button>
      );
    }
    return (
      <Button
        ref={ref}
        type="submit"
        {...(pending ? {} : { faPresetIcon })}
        disabled={pending}
        {...props}
      >
        {pending ? (
          <Icon
            faIcon="spinner"
            width={35}
            height={35}
            className={cn("animate-spin text-2xl", iconClassName)}
          />
        ) : (
          children
        )}
      </Button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
