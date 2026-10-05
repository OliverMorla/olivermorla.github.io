import {
  FieldShell,
  fieldClassName,
  getFieldIds,
  type FieldProps,
} from "@/components/ui/field";
import { cn } from "@/utils/classNames";
import type { ComponentProps } from "react";

export type InputProps = ComponentProps<"input"> & FieldProps;

const Input = ({
  id,
  name,
  label,
  description,
  error,
  parentClassName,
  labelClassName,
  className,
  type = "text",
  ...props
}: InputProps) => {
  const inputId = id ?? name;
  const { errors, errorId, descriptionId, describedBy } = getFieldIds(inputId, {
    description,
    error,
  });

  return (
    <FieldShell
      id={inputId}
      label={label}
      description={description}
      descriptionId={descriptionId}
      errorId={errorId}
      errors={errors}
      parentClassName={parentClassName}
      labelClassName={labelClassName}
    >
      <input
        id={inputId}
        name={name}
        type={type}
        aria-invalid={errors.length > 0 || undefined}
        aria-describedby={describedBy}
        className={cn(fieldClassName, className)}
        {...props}
      />
    </FieldShell>
  );
};

export default Input;
