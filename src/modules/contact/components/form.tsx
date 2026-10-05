"use client";

import SubmitButton from "@/components/helpers/submit-button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { initialContactFormState } from "@/modules/contact/lib/state";
import { submitContactForm } from "@/modules/contact/server/actions";
import { cn } from "@/utils/classNames";
import { ArrowRight, CircleCheck } from "lucide-react";
import { useActionState, type ComponentProps } from "react";

export type ContactFormProps = Omit<ComponentProps<"form">, "action">;

const ContactForm = ({ className, ...props }: ContactFormProps) => {
  // Bound to a Server Action, so the form also submits before hydration.
  const [state, formAction] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const { fieldErrors, fields } = state;

  return (
    <form
      {...props}
      action={formAction}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="firstName"
          label="First name"
          autoComplete="given-name"
          required
          defaultValue={fields?.firstName}
          error={fieldErrors?.firstName}
        />
        <Input
          name="lastName"
          label="Last name"
          autoComplete="family-name"
          defaultValue={fields?.lastName}
          error={fieldErrors?.lastName}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          required
          defaultValue={fields?.email}
          error={fieldErrors?.email}
        />
        <Input
          type="tel"
          name="phoneNumber"
          label="Phone"
          autoComplete="tel"
          inputMode="tel"
          required
          defaultValue={fields?.phoneNumber}
          error={fieldErrors?.phoneNumber}
        />
      </div>
      <Input
        name="subject"
        label="Subject"
        required
        defaultValue={fields?.subject}
        error={fieldErrors?.subject}
      />
      <Textarea
        rows={5}
        name="message"
        label="Message"
        required
        defaultValue={fields?.message}
        error={fieldErrors?.message}
      />

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted max-w-sm text-sm">
          I&apos;ll only use your details to reply to this message.
        </p>
        <SubmitButton
          variant="solidDark"
          className="group w-full sm:w-fit"
          loaderText="Sending"
        >
          Send message
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </SubmitButton>
      </div>

      <p
        role="status"
        className={cn(
          "flex min-h-6 items-start gap-2 text-sm",
          state.status === "error" && "text-red-600 dark:text-red-400",
          state.status === "success" &&
            "text-emerald-700 dark:text-emerald-400",
        )}
      >
        {state.status === "success" && (
          <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
        )}
        {state.message}
      </p>
    </form>
  );
};

export default ContactForm;
