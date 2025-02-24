"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPresetIcons, FaPresetIconsTypes } from "@/constants";
import { cn } from "@/utils";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const defaultClassName =
  "relative transition-all duration-300 ease-in-out w-full appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const textAreaVariants = cva(defaultClassName, {
  variants: {
    variant: {
      none: "",

      // Adjust CSS variables to fit your color scheme
      solid:
        "bg-[var(--var-name)] hover:bg-[var(--var-name-dark)] active:bg-[var(--var-name-darker)] text-[var(--var-name-text)] ring-[var(--var-name-ring)] shadow-sm hover:shadow-lg rounded-md",
      // --------------------------------------------- //

      transparent:
        "bg-transparent border border-neutral-300 text-neutral-900 shadow-sm hover:shadow-lg rounded-md dark:border-neutral-700 dark:text-neutral-100",
      solidDark:
        "bg-neutral-900 text-neutral-100 rounded-md shadow-sm outline-[1px] border ring-blue-400 border-neutral-600",
      solidLight:
        "bg-neutral-100 text-neutral-900 rounded-md shadow-sm outline-[1px] border ring-blue-400 border-neutral-300 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700",
    },
    size: {
      none: "",
      sm: "px-2 py-1",
      md: "px-4 py-2",
      lg: "px-6 py-3",
      xl: "px-8 py-4",
      smlong: "px-6 py-1",
      mdlong: "px-8 py-2",
      lglong: "px-10 py-3",
      xllong: "px-12 py-4",
    },
    width: {
      none: "",
      sm: "w-20",
      smlong: "w-32",
      md: "w-40",
      mdlong: "w-48",
      lg: "w-60",
      lglong: "w-64",
      xl: "w-80",
      xllong: "w-96",
      fit: "w-fit",
      full: "w-full",
      auto: "w-auto",
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    fontSize: {
      none: "",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    shadow: {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      cl: "shadow-none",
      inner: "shadow-inner",
      current: "shadow-current",
      inherit: "shadow-inherit",
      transparent: "shadow-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    shadow: "none",
    fontSize: "md",
    rounded: "md",
    width: "auto",
    variant: "solidLight",
  },
});

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<"textarea">,
    VariantProps<typeof textAreaVariants> {
  label?: string;
  placeholder?: string;
  faPresetIcon?: FaPresetIconsTypes;
  iconClassName?: string;
  labelClassName?: string;
  parentClassName?: string;
  wrapperClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      variant,
      size,
      width,
      fontSize,
      shadow,
      rounded,
      placeholder = "Enter text here",
      faPresetIcon,
      iconClassName,
      labelClassName,
      parentClassName,
      wrapperClassName,
      className,
      ...props
    },
    ref
  ) => {
    const ariaLabel =
      props["aria-label"] ||
      (label && `textarea-${label}`) ||
      (props.name && `textarea-${props.name}`) ||
      `textarea-${size || "default"}`;

    return (
      <div className={cn("relative flex flex-col", parentClassName)}>
        {label && (
          <label
            className={cn("text-start", labelClassName)}
            htmlFor={props.name}
          >
            {label}
          </label>
        )}
        <div className={cn("relative flex items-center", wrapperClassName)}>
          <textarea
            ref={ref}
            {...props}
            className={twMerge(
              textAreaVariants({
                variant,
                size,
                shadow,
                width,
                fontSize,
                rounded,
                className,
              }),
              faPresetIcon && "pl-8"
            )}
            aria-label={ariaLabel}
            placeholder={placeholder}
          />

          {faPresetIcon && (
            <FontAwesomeIcon
              icon={faPresetIcons[faPresetIcon]}
              width={15}
              height={15}
              className={cn(
                "pointer-events-none absolute left-[10px] top-[15px]",
                variant === "solidDark" && "text-white",
                iconClassName
              )}
            />
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
