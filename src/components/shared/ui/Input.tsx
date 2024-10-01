"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPresetIcons, FaPresetIconsTypes } from "@/constants";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const defaultClassName =
  "relative transition-all duration-300 ease-in-out w-full appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const inputVariants = cva(defaultClassName, {
  variants: {
    variant: {
      none: "",
      modern:
        "bg-white text-gray-800 border-b-2 border-gray-300 focus:border-blue-500 transition-colors duration-300",
      minimal:
        "bg-transparent text-gray-800 border-b border-gray-200 focus:border-gray-800 transition-colors duration-300",
      pill: "bg-gray-100 text-gray-800 rounded-full px-6 focus:bg-white focus:shadow-md transition-all duration-300",
      outline:
        "bg-transparent text-gray-800 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300",
      floating:
        "bg-white text-gray-800 border border-gray-200 rounded-md shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300",
      solidDark:
        "bg-neutral-900 text-neutral-100 rounded-md !shadow-sm outline-[1px] border-[1px] !ring-blue-400 border-neutral-300",
      solidLight:
        "bg-neutral-100 text-neutral-900 rounded-md !shadow-sm outline-[1px] border-[1px] !ring-blue-400 border-neutral-300",
      transparentLight:
        "bg-transparent text-neutral-900 rounded-md !shadow-sm outline-[1px] border-[1px] !ring-blue-400 border-neutral-300",
      transparentBottom:
        "bg-transparent text-neutral-900 !shadow-sm outline-[1px] border-b-[1px] !ring-blue-400 border-b-neutral-300",
      solid:
        "bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-md !shadow-sm outline-[1px] border-[1px] !ring-[var(--color-tertiary)] border-neutral-300",
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
    variant: "solidLight",
    size: "md",
    fontSize: "md",
    shadow: "none",
  },
});

export interface InputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  placeholder?: string;
  faPresetIcon?: FaPresetIconsTypes;
  iconClassName?: string;
  labelClassName?: string;
  parentClassName?: string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      variant,
      size,
      fontSize,
      shadow,
      placeholder = "Enter text here",
      faPresetIcon,
      iconClassName,
      labelClassName,
      parentClassName,
      wrapperClassName,
      className,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [viewPassword, setViewPassword] = useState(false);
    const ariaLabel =
      props["aria-label"] ||
      (label && `input-${label}`) ||
      (props.name && `input-${props.name}`) ||
      `input-${type}`;

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
          <input
            ref={ref}
            type={viewPassword && type === "password" ? "text" : type}
            {...props}
            className={twMerge(
              inputVariants({ variant, size, shadow, fontSize }),
              faPresetIcon && "pl-8",
              className
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
                "pointer-events-none absolute left-[10px]",
                iconClassName
              )}
            />
          )}
          {type === "password" && (
            <FontAwesomeIcon
              icon={faPresetIcons.eye}
              width={25}
              height={25}
              onClick={() => setViewPassword((prev) => !prev)}
              className={cn(
                "absolute right-3 cursor-pointer transition-all ease-in-out",
                viewPassword ? "opacity-100" : "opacity-40"
              )}
            />
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
