/* eslint-disable @next/next/no-img-element */
"use client";

import { ReactNode, useState, ComponentProps } from "react";
import { cn } from "@/utils/classNames";
import { cva, type VariantProps } from "class-variance-authority";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground
// dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent
// px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex
// file:h-7 file:border-0 file:bg-transparent file:text-sm
// file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
// "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
// "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

export const inputDisabledClasses =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none";

export const inputInvalidClasses =
  "aria-invalid:ring-red-400/20 dark:aria-invalid:ring-red-400/40 aria-invalid:border-red-400";

const defaultClassName = cn(
  "relative transition ease-in-out w-full border border-neutral-300/75 dark:border-neutral-700/75 rounded-md",
  "focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-transparent",
  "focus-visible:ring-blue-400/75 dark:focus-visible:ring-blue-600/75",
  "placeholder:text-neutral-400/75 dark:placeholder:text-neutral-600/75",
  "touch-manipulation selection:bg-blue-200/75 dark:selection:bg-blue-900/75",
  "read-only:bg-neutral-50 dark:read-only:bg-neutral-800 read-only:cursor-default",
  "file:bg-neutral-300/75 dark:file:bg-neutral-700/75 hover:file:bg-neutral-500 dark:hover:file:bg-neutral-900 file:cursor-pointer file:pl-8 file:pr-4 file:py-2 file:mr-2 file:transition",
  "aria-busy:opacity-75 aria-busy:cursor-wait",
  inputDisabledClasses,
  inputInvalidClasses
);

const inputVariants = cva(defaultClassName, {
  variants: {
    variant: {
      none: "",
      solid: "bg-transparent",
      solidDark: "bg-neutral-900 text-neutral-100",
      solidLight: "bg-neutral-50 dark:bg-neutral-900",
    },
    padding: {
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
      xs: "shadow-xs",
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
    padding: "md",
    fontSize: "md",
    shadow: "xs",
  },
});

export type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    icon?: ReactNode;
    label?: string;
    error?: string | string[];
    description?: string;
    iconClassName?: string;
    labelClassName?: string;
    parentClassName?: string;
    wrapperClassName?: string;
  };

const Input = ({
  label,
  variant,
  icon,
  padding,
  fontSize,
  shadow,
  error,
  description,
  placeholder = "Enter text here",
  iconClassName,
  labelClassName,
  parentClassName,
  wrapperClassName,
  className,
  type = "text",
  ...props
}: InputProps) => {
  const [viewPassword, setViewPassword] = useState(false);

  const ariaLabel =
    props["aria-label"] ||
    (label && `input-${label}`) ||
    (props.name && `input-${props.name}`) ||
    `input-${type}`;

  const [file, setFile] = useState<{
    file: File | null;
    url: string | null;
  }>({
    file: null,
    url: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile({ file, url: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("relative flex flex-col gap-2", parentClassName)}>
      {label && (
        <label
          htmlFor={props.name}
          className={cn(
            "text-start text-base max-sm:text-sm font-medium",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn("relative flex items-center w-full", wrapperClassName)}
      >
        <input
          type={type === "password" && viewPassword ? "text" : type}
          onChange={type === "file" ? handleFileChange : undefined}
          {...props}
          className={cn(
            inputVariants({ variant, padding, shadow, fontSize }),
            icon && "pl-8",
            type === "file" && "p-0",
            className
          )}
          aria-label={ariaLabel}
          placeholder={placeholder}
        />
        {icon && (
          <span
            className={cn(
              "absolute left-[10px]",
              iconClassName,
              variant === "solidDark" && "text-neutral-100"
            )}
          >
            {icon}
          </span>
        )}

        {type === "password" && (
          <button
            type="button"
            className="absolute right-[10px]"
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {type === "file" && (
        <div className="flex items-center gap-2">
          {file.url && (
            <img
              src={file.url}
              alt="File"
              className="w-full h-full max-w-40 rounded-md"
            />
          )}
          <div className="flex flex-col gap-px">
            <h1 className="font-medium">Preview</h1>
            {file.file?.name ? (
              <h1 className="text-muted">{file.file?.name}</h1>
            ) : (
              <h1 className="text-muted">No file selected</h1>
            )}
          </div>
        </div>
      )}
      {description && (
        <p className="text-start text-sm max-sm:text-xs opacity-60">
          {description}
        </p>
      )}
      {error && typeof error === "string" && (
        <p className="text-start text-sm max-sm:text-xs text-red-500">
          {error}
        </p>
      )}
      {error &&
        typeof error === "object" &&
        Object.values(error).map((err) => (
          <p
            key={err}
            className="text-start text-sm max-sm:text-xs text-red-500"
          >
            {err}
          </p>
        ))}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
