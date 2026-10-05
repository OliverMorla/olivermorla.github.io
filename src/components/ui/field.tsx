import { cn } from "@/utils/classNames";
import type { ReactNode } from "react";

export type FieldProps = {
  label?: string;
  description?: string;
  error?: string | string[];
  parentClassName?: string;
  labelClassName?: string;
};

export const fieldClassName = cn(
  "w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-base shadow-xs transition-[border-color,box-shadow] outline-none dark:border-neutral-700 dark:bg-neutral-900",
  "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40",
  "aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:border-red-400",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

/** Ids that tie a control to its description and error message. */
export const getFieldIds = (
  id: string | undefined,
  { description, error }: Pick<FieldProps, "description" | "error">,
) => {
  const errors = error ? [error].flat() : [];
  const descriptionId = description && id ? `${id}-description` : undefined;
  const errorId = errors.length && id ? `${id}-error` : undefined;

  return {
    errors,
    errorId,
    descriptionId,
    describedBy:
      [descriptionId, errorId].filter(Boolean).join(" ") || undefined,
  };
};

type FieldShellProps = FieldProps & {
  id?: string;
  descriptionId?: string;
  errorId?: string;
  errors: string[];
  children: ReactNode;
};

export const FieldShell = ({
  id,
  label,
  description,
  descriptionId,
  errorId,
  errors,
  parentClassName,
  labelClassName,
  children,
}: FieldShellProps) => (
  <div className={cn("flex flex-col gap-2", parentClassName)}>
    {label && (
      <label
        htmlFor={id}
        className={cn("text-start text-sm font-medium", labelClassName)}
      >
        {label}
      </label>
    )}
    {children}
    {description && (
      <p id={descriptionId} className="text-muted text-start text-sm">
        {description}
      </p>
    )}
    {errors.length > 0 && (
      <p
        id={errorId}
        className="text-start text-sm text-red-600 dark:text-red-400"
      >
        {errors.join(" ")}
      </p>
    )}
  </div>
);
