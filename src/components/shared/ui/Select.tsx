"use client";
// ComponentPropsWithoutRef is a utility type that allows you to create a type that represents the props of a component without the ref prop.
import React from "react";
// cn is a utility function that combines class names
import { cn } from "@/utils";

// FontAwesomeIcon is a component that renders an icon from the FontAwesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// faPresetIcons is an object that contains all the preset icons
import { faPresetIcons, FaPresetIconsTypes } from "@/constants";

import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export type SelectProps = Readonly<
  VariantProps<typeof selectVariants> &
    React.ComponentPropsWithoutRef<"select"> & {
      label?: string;
      parentClassName?: string;
      labelClassName?: string;
      iconClassName?: string;
      wrapperClassName?: string;
      faPresetIcon?: FaPresetIconsTypes;
    }
>;

// Default Class Name
const defaultClassName =
  "relative transition-all duration-300 ease-in-out w-full appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const selectVariants = cva(defaultClassName, {
  variants: {
    variant: {
      none: "",
      // Adjust CSS variables to fit your color scheme
      solid:
        "bg-[var(--var-name)] hover:bg-[var(--var-name-dark)] active:bg-[var(--var-name-darker)] text-[var(--var-name-text)] ring-[var(--var-name-ring)] shadow-sm hover:shadow-lg rounded-md",
      // --------------------------------------------- //

      solidDark:
        "bg-neutral-900 dark:text-neutral-100 text-neutral-100 rounded-md shadow-sm outline-[1px] ring-blue-400 border border-neutral-600",
      solidLight:
        "bg-neutral-100 text-neutral-900 rounded-md shadow-sm outline-[1px] border ring-blue-400 border-neutral-300 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:border-blue-400 dark:hover:border-blue-500 dark:focus:ring-blue-400",
      transparentLight:
        "bg-transparent dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-none border-b border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400",
      transparentBottom:
        "bg-transparent text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-300 dark:border-neutral-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 shadow-sm",
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
    size: "md",
    width: "md",
    shadow: "none",
    fontSize: "md",
    textAlign: "left",
    leftPadding: "md",
    variant: "solidLight",
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
      const ariaLabel = React.useMemo(
        () =>
          props["aria-label"] ||
          (props.name && `select-${props.name}`) ||
          (label && `select-${label}`) ||
          (variant && `select-${variant}`) ||
          "select",
        [props, label, variant]
      );

      return (
        <div className={cn("relative flex flex-col", parentClassName)}>
          {label && (
            <label
              className={cn("text-base font-medium", labelClassName)}
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
                  "z-10 pointer-events-none select-none cursor-not-allowed absolute left-[10px]",
                  variant === "solidDark" && "text-neutral-100",
                  iconClassName
                )}
              />
            )}

            <select
              ref={ref}
              id={props.name}
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
                "pointer-events-none select-none cursor-not-allowed absolute right-[10px] opacity-60",
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
    ({ children, ...props }, ref) => (
      <option ref={ref} {...props}>
        {children}
      </option>
    )
  )
);

Select.displayName = "Select";
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
