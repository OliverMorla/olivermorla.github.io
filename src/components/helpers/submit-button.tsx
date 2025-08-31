import { cn } from "@/utils/classNames";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ComponentPropsWithRef, ComponentType, FC } from "react";
import Button, { type ButtonProps } from "@/components/ui/button";

export type SubmitButtonProps = Omit<ComponentPropsWithRef<"button">, "type"> &
  Readonly<{
    Loader?: ComponentType<{ className?: string }>;
    loaderClassName?: string;
  }> &
  ButtonProps;

export const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  className,
  loaderClassName,
  Loader = Loader2,
  ...props
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(
        className,
        "disabled:cursor-not-allowed disabled:select-none disabled:pointer-events-none disabled:opacity-50"
      )}
      {...props}
    >
      {pending ? (
        <Loader className={cn("animate-spin w-5 h-5", loaderClassName)} />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
