"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPresetIcons, FaPresetIconsTypes } from "@/constants";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const defaultClassName =
  "relative flex flex-col transition-all duration-300 ease-in-out gap-8 w-full hover:scale-[1.02] cursor-pointer select-none pointer-events-auto";

const cardVariants = cva(defaultClassName, {
  variants: {
    variant: {
      // Existing variants (slightly modified)
      none: "",
      solid:
        "shadow-md rounded-md bg-[var(--color-primary)] text-[var(--color-secondary)] hover:opacity-90 active:opacity-80",
      solidAlt:
        "shadow-md rounded-md bg-[var(--color-secondary)] text-[var(--color-primary)] hover:opacity-90 active:opacity-80",
      solidDark:
        "shadow-md rounded-md bg-neutral-900 text-neutral-100 hover:bg-neutral-800 active:bg-neutral-700",
      solidLight:
        "shadow-md rounded-md bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300",
      transparent:
        "shadow-md rounded-md bg-transparent text-[var(--color-primary)] hover:bg-opacity-10 active:bg-opacity-20",

      // New modern, cool, and clean variants
      glassmorphic:
        "backdrop-filter backdrop-blur-lg bg-opacity-30 bg-white dark:bg-opacity-30 dark:bg-black rounded-md shadow-lg",
      neobrutal:
        "border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
      minimal:
        "border border-gray-200 dark:border-gray-800 rounded-md hover:border-gray-300 dark:hover:border-gray-700 transition-colors",
      gradient:
        "bg-gradient-to-br from-purple-500 to-pink-500 text-black rounded-md shadow-md hover:from-purple-600 hover:to-pink-600",
      outlined:
        "border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]",

      // Semantic variants
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 rounded-md shadow-md",
      warning:
        "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 rounded-md shadow-md",
      success:
        "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 rounded-md shadow-md",
      info: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 rounded-md shadow-md",
      disabled:
        "bg-gray-300 text-gray-500 cursor-not-allowed select-none pointer-events-none shadow-none",
    },
    size: {
      none: "",
      sm: "p-4 max-sm:p-2",
      md: "p-8 max-sm:p-4",
      lg: "p-12 max-sm:p-6",
      xl: "p-16 max-sm:p-8",
      smrec: "px-6 py-1 max-sm:px-3 max-sm:py-1",
      mdrec: "px-8 py-2 max-sm:px-4 max-sm:py-2",
      lgrec: "px-10 py-3 max-sm:px-5 max-sm:py-3",
      xlrec: "px-12 py-4 max-sm:px-6 max-sm:py-2",
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
    rounded: {
      none: "",
      cl: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    fontSize: {
      none: "",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "solidLight",
    size: "md",
    shadow: "md",
    rounded: "md",
    fontSize: "md",
  },
});

export interface CardProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardVariants> {
  title?: string;
  description?: string;
  tagline?: string;
  faPresetIcon?: FaPresetIconsTypes;
  imageUrl?: string;
  bgImage?: string;
  hideDescription?: boolean;
  dummyDescription?: boolean;
  imageClassName?: string;
  titleClassName?: string;
  titleWrapperClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  dimensions?: {
    maxWidth?: string;
    maxHeight?: string;
  };
}

const defaultTitle = "Title";
const defaultDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      title = defaultTitle,
      description,
      tagline,
      faPresetIcon,
      imageUrl,
      bgImage,
      hideDescription = false,
      dummyDescription = false,
      imageClassName,
      titleClassName,
      titleWrapperClassName,
      headerClassName,
      bodyClassName,
      dimensions,
      variant,
      size,
      shadow,
      rounded,
      fontSize,
      className,
      ...props
    },
    ref
  ) => {
    const ariaLabel =
      props["aria-label"] || `card-${variant || title || "default"}`;

    const cardStyle = {
      maxHeight: dimensions?.maxHeight || "auto",
      maxWidth: dimensions?.maxWidth || "475px",
      backgroundImage: bgImage ? `url(${bgImage})` : "none",
    };

    return (
      <div
        ref={ref}
        aria-label={ariaLabel}
        className={twMerge(
          cardVariants({ variant, size, shadow, rounded, fontSize }),
          className
        )}
        style={cardStyle}
        {...props}
      >
        <div className={cn("flex flex-col", headerClassName)}>
          {imageUrl && (
            <Image
              src={imageUrl}
              width={200}
              height={200}
              alt="card-image"
              className={imageClassName}
            />
          )}
          {faPresetIcon && (
            <FontAwesomeIcon
              icon={faPresetIcons[faPresetIcon]}
              width={25}
              height={25}
              className={imageClassName}
            />
          )}
          <div className={titleWrapperClassName}>
            <h1
              className={cn(
                "text-5xl max-2xl:text-4xl max-xl:text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg font-extrabold",
                titleClassName
              )}
            >
              {title}
            </h1>
            {tagline && <p className="opacity-60 text-sm">{tagline}</p>}
          </div>
        </div>

        <div className={bodyClassName}>
          {dummyDescription && !description && <p>{defaultDescription}</p>}
          {description && !hideDescription && <p>{description}</p>}
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
