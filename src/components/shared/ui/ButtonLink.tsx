"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { faPresetIcons, type FaPresetIconsTypes } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const buttonLinkVariants = cva(
  "relative inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out text-nowrap focus:outline-none cursor-pointer select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:shadow-sm disabled:hover:shadow-none",
  {
    variants: {
      variant: {
        none: "",

        // Adjust CSS variables to fit your color scheme
        solid:
          "bg-[var(--color-tertiary)] text-[var(--color-dark)] active:bg-[var(--color-secondary)] active:text-[var(--color-light)] shadow-sm rounded-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-light)]",
        transparent:
          "bg-transparent border-[1px] border-[var(--color-secondary)] text-[var(--color-secondary)] active:text-[var(--color-primary)] shadow-sm rounded-md hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]",
        
        outlineDark:
          "bg-transparent border-neutral-800 border-[1px] hover:border-neutral-900 active:border-neutral-950 shadow-sm active:shadow-md rounded-md",
        outlineLight:
          "bg-transparent border-neutral-100 border-[1px] hover:border-neutral-200 active:border-neutral-300 shadow-sm active:shadow-md rounded-md",
        solidDark:
          "bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-950 text-neutral-100 shadow-sm rounded-md",
        solidLight:
          "bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-400 text-neutral-900 shadow-sm rounded-md !focus-visible:ring-neutral-400 !ring-neutral-400 outline-neutral-400",
        transparentDark:
          "bg-transparent hover:bg-neutral-800 border-neutral-800 border-[1px] active:bg-neutral-900 shadow-sm rounded-md active:text-neutral-100",
        transparentLight:
          "bg-transparent hover:bg-neutral-100 border-neutral-100 border-[1px] active:bg-neutral-200 shadow-sm rounded-md active:text-neutral-800",

        danger:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 rounded-md shadow-sm",
        warning:
          "bg-yellow-600 text-white hover:bg-yellow-800 active:bg-yellow-400 rounded-md shadow-sm",
        success:
          "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 rounded-md shadow-sm",
        info: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 rounded-md shadow-sm",
        disabled:
          "bg-gray-400 text-gray-200 cursor-not-allowed select-none pointer-events-none shadow-none hover:shadow-none active:shadow-none active:bg-current hover:bg-current hover:text-current active:text-current rounded-md",
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
      rounded: {
        none: "",
        cl: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      active: {
        none: "",
        green: "hover:bg-green-800 hover:text-green-100 active:bg-green-900 active:text-green-100",
        blue: "hover:bg-blue-800 hover:text-blue-100 active:bg-blue-900 active:text-blue-100",
        red: "hover:bg-red-800 hover:text-red-100 active:bg-red-900 active:text-red-100",
        yellow: "hover:bg-yellow-800 hover:text-yellow-100 active:bg-yellow-900 active:text-yellow-100",
        purple: "hover:bg-purple-800 hover:text-purple-100 active:bg-purple-900 active:text-purple-100",
        pink: "hover:bg-pink-800 hover:text-pink-100 active:bg-pink-900 active:text-pink-100",
        orange: "hover:bg-orange-800 hover:text-orange-100 active:bg-orange-900 active:text-orange-100",
        stone: "hover:bg-stone-800 hover:text-stone-100 active:bg-stone-900 active:text-stone-100",
        emerald: "hover:bg-emerald-800 hover:text-emerald-100 active:bg-emerald-900 active:text-emerald-100",
        lime: "hover:bg-lime-800 hover:text-lime-100 active:bg-lime-900 active:text-lime-100",
        cyan: "hover:bg-cyan-800 hover:text-cyan-100 active:bg-cyan-900 active:text-cyan-100",
        sky: "hover:bg-sky-800 hover:text-sky-100 active:bg-sky-900 active:text-sky-100",
        teal: "hover:bg-teal-800 hover:text-teal-100 active:bg-teal-900 active:text-teal-100",
        rose: "hover:bg-rose-800 hover:text-rose-100 active:bg-rose-900 active:text-rose-100",
        amber: "hover:bg-amber-800 hover:text-amber-100 active:bg-amber-900 active:text-amber-100",
        indigo: "hover:bg-indigo-800 hover:text-indigo-100 active:bg-indigo-900 active:text-indigo-100",
        violet: "hover:bg-violet-800 hover:text-violet-100 active:bg-violet-900 active:text-violet-100",
        fuchsia: "hover:bg-fuchsia-800 hover:text-fuchsia-100 active:bg-fuchsia-900 active:text-fuchsia-100",
        dark: "hover:bg-neutral-800 hover:text-neutral-100 active:bg-neutral-900 active:text-neutral-100",
        gray: "hover:bg-neutral-300 hover:text-neutral-800 active:bg-neutral-400 active:text-neutral-800",
        light: "hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200 active:text-neutral-800",
        dim: "hover:bg-neutral-600 hover:text-neutral-100 active:bg-neutral-700 active:text-neutral-100",
      },
      animation: {
        none: "",
        shadow: "hover:shadow-lg active:shadow-md transition-shadow",
        grow: "hover:scale-[1.02] active:scale-[0.98] transition-transform",
        slideY:
          "hover:-translate-y-1 active:translate-y-0.5 transition-transform",
        background:
          "hover:bg-opacity-90 active:bg-opacity-100 transition-colors",
        text: "hover:text-opacity-90 active:text-opacity-100 transition-colors",
        border:
          "hover:border-opacity-90 active:border-opacity-100 transition-colors",
        glow: "hover:ring-2 hover:ring-opacity-50 active:ring-opacity-75 transition-all",
        pulse: "animate-pulse",
      },
    },
    defaultVariants: {
      fontSize: "md",
      size: "md",
      width: "fit",
      shadow: "none",
      rounded: "none",
      animation: "none",
      variant: "solidDark",
    },
  }
);

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonLinkVariants> {
  href: string;
  title?: string;
  faPresetIcon?: FaPresetIconsTypes;
  customIconUrl?: string;
  readonly iconPosition?: "left" | "right";
  iconDimensions?: {
    width?: number;
    height?: number;
  };
  iconClassName?: string;
  enableScroll?: boolean;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      href = "#",
      title,
      faPresetIcon,
      customIconUrl,
      iconDimensions,
      iconClassName,
      iconPosition = "left",
      enableScroll = true,
      variant,
      size,
      width,
      fontSize,
      shadow,
      rounded,
      animation,
      className,
      ...props
    },
    ref
  ) => {
    const ariaLabel =
      props["aria-label"] ||
      (variant && `button-${variant}`) ||
      (title && `button-${title}`) ||
      "button-link";

    return (
      <Link
        href={href || "#"}
        ref={ref}
        aria-label={ariaLabel}
        scroll={enableScroll}
        className={twMerge(
          buttonLinkVariants({ variant, size, width, fontSize, shadow, rounded, animation }),
          className
        )}
        {...props}
      >
        {faPresetIcon && !customIconUrl && iconPosition === "left" && (
          <FontAwesomeIcon
            icon={faPresetIcons[faPresetIcon]}
            width={iconDimensions?.width || 25}
            height={iconDimensions?.height || 25}
            className={cn("inline-block", iconClassName)}
          />
        )}
        {customIconUrl && !faPresetIcon && iconPosition === "left" && (
          <Image
            src={customIconUrl}
            height={iconDimensions?.height || 25}
            width={iconDimensions?.width || 25}
            alt={title || "button-icon"}
            className={cn("inline-block", iconClassName)}
          />
        )}
        {children}
        {faPresetIcon && !customIconUrl && iconPosition === "right" && (
          <FontAwesomeIcon
            icon={faPresetIcons[faPresetIcon]}
            width={iconDimensions?.width || 25}
            height={iconDimensions?.height || 25}
            className={cn("inline-block", iconClassName)}
          />
        )}
        {customIconUrl && !faPresetIcon && iconPosition === "right" && (
          <Image
            src={customIconUrl}
            height={iconDimensions?.height || 25}
            width={iconDimensions?.width || 25}
            alt={title || "button-icon"}
            className={cn("inline-block", iconClassName)}
          />
        )}
      </Link>
    );
  }
);

ButtonLink.displayName = "ButtonLink";

export default ButtonLink;
