import {
  FieldShell,
  fieldClassName,
  getFieldIds,
  type FieldProps,
} from "@/components/ui/field";
import { cn } from "@/utils/classNames";
import type { ComponentProps } from "react";

export type TextareaProps = ComponentProps<"textarea"> & FieldProps;

const Textarea = ({
  id,
  name,
  label,
  description,
  error,
  parentClassName,
  labelClassName,
  className,
  ...props
}: TextareaProps) => {
  const textareaId = id ?? name;
  const { errors, errorId, descriptionId, describedBy } = getFieldIds(
    textareaId,
    { description, error },
  );

  return (
    <FieldShell
      id={textareaId}
      label={label}
      description={description}
      descriptionId={descriptionId}
      errorId={errorId}
      errors={errors}
      parentClassName={parentClassName}
      labelClassName={labelClassName}
    >
      <textarea
        id={textareaId}
        name={name}
        aria-invalid={errors.length > 0 || undefined}
        aria-describedby={describedBy}
        className={cn(fieldClassName, "min-h-32 resize-y", className)}
        {...props}
      />
    </FieldShell>
  );
};

export default Textarea;
