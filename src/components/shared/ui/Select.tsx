"use client";
// ComponentPropsWithoutRef is a utility type that allows you to create a type that represents the props of a component without the ref prop.
import React from "react";
// cn is a utility function that combines class names
import { cn } from "@/lib/utils";
// FontAwesomeIcon is a component that renders an icon from the FontAwesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// faPresetIcons is an object that contains all the preset icons
import { faPresetIcons, FaPresetIconsTypes } from "@/constants";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export type SelectProps = VariantProps<typeof selectVariants> &
  React.ComponentPropsWithoutRef<"select"> & {
    readonly label?: string;
    readonly parentClassName?: string;
    readonly labelClassName?: string;
    readonly iconClassName?: string;
    readonly wrapperClassName?: string;
    readonly faPresetIcon?: FaPresetIconsTypes;
  };

// Default Class Name
const defaultClassName =
  "relative transition-all duration-300 ease-in-out w-full appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const selectVariants = cva(defaultClassName, {
  variants: {
    variant: {
      none: "",
      solidDark:
        "bg-neutral-900 text-neutral-100 rounded-md !shadow-sm outline-[1px] border-[1px] !ring-blue-400 border-neutral-300",
      solidLight:
        "bg-neutral-100 text-neutral-900 rounded-md !shadow-sm outline-[1px] border-[1px] !ring-blue-400 border-neutral-300",
      transparentLight:
        "bg-transparent text-neutral-900 rounded-md !shadow-sm outline-[1px] border-[1px] !ring-blue-400 border-neutral-300",
      transparentBottom:
        "bg-transparent text-neutral-900 !shadow-sm outline-[1px] border-b-[1px] !ring-blue-400 border-b-neutral-300",

      // Adjust CSS variables to fit your color scheme
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

    width: {
      none: "",
      sm: "w-20",
      md: "w-40",
      lg: "w-60",
      xl: "w-80",
      fit: "w-fit",
      full: "w-full",
      auto: "w-auto",
    },

    textAlign: {
      none: "",
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },

    leftPadding: {
      none: "",
      sm: "pl-2",
      md: "pl-4",
      lg: "pl-6",
      xl: "pl-8",
      smlong: "pl-6",
      mdlong: "pl-8",
      lglong: "pl-10",
      xllong: "pl-12",
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
    width: "md",
    shadow: "none",
    fontSize: "md",
    textAlign: "left",
    leftPadding: "md",
  },
});

/**
   Select Component
   @param {string} label - The label of the select component  
   @param {string} variant - The variant of the select component
   @param {string} className - The class name of the select component
   @param {string} faPresetIcon - The preset icon of the select component
   @param {string} iconClassName - The class name of the icon
   @param {string} labelClassName - The class name of the label
   @param {string} parentClassName - The class name of the parent
   @param {string} wrapperClassName  - The class name of the container
   @param {string} children - The children of the select component
   @param {string} size - The size of the select component
   @param {string} fontSize - The font size of the select component
   @param {string} shadow - The shadow of the select component
   @param {string} width - The width of the select component
   @param {string} leftPadding - The left padding of the select component
   @param {string} textAlign - The text align of the select component
   @param {React.ComponentPropsWithoutRef<"select">} props - The props of the select component
   @param {React.Ref<HTMLSelectElement>} ref - The ref of the select component
 */
const Select = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>(
    (
      {
        label,
        variant,
        size,
        fontSize,
        shadow,
        textAlign,
        faPresetIcon,
        className,
        width,
        leftPadding,
        iconClassName,
        labelClassName,
        parentClassName,
        wrapperClassName,
        children,
        ...props
      },
      ref
    ) => {
      const ariaLabel =
        props["aria-label"] ||
        (props.name && `select-${props.name}`) ||
        (label && `select-${label}`) ||
        (variant && `select-${variant}`) ||
        "select";
      return (
        <div className={cn("relative flex flex-col", parentClassName)}>
          {label && (
            <label
              className={cn("text-base", labelClassName)}
              htmlFor={props.name}
            >
              {label}
            </label>
          )}

          <div className={cn("relative flex items-center", wrapperClassName)}>
            {faPresetIcon && (
              <FontAwesomeIcon
                icon={faPresetIcons[faPresetIcon]}
                width={15}
                height={15}
                className={cn(
                  "z-10 pointer-events-none absolute left-[10px] text-neutral-900",
                  iconClassName
                )}
              />
            )}

            <select
              ref={ref}
              aria-label={ariaLabel}
              className={twMerge(
                selectVariants({
                  size,
                  width,
                  shadow,
                  variant,
                  fontSize,
                  className,
                  textAlign,
                  leftPadding,
                }),
                faPresetIcon && "pl-8"
              )}
              {...props}
            >
              {children}
            </select>

            <FontAwesomeIcon
              icon={faPresetIcons.caretDown}
              width={15}
              height={15}
              className={cn(
                `pointer-events-none absolute right-[10px] text-gray-400 transition-all duration-200 ease-in-out`,
                iconClassName
              )}
            />
          </div>
        </div>
      );
    }
  )
);

const SelectOption = React.memo(
  React.forwardRef<HTMLOptionElement, React.ComponentPropsWithoutRef<"option">>(
    ({ children, ...props }, ref) => {
      return (
        <option ref={ref} {...props}>
          {children}
        </option>
      );
    }
  )
);

Select.displayName = "Select";
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
