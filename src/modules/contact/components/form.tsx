"use client";

import { ComponentProps } from "react";
import { cn } from "@/utils/classNames";
import Input from "@/components/ui/input";
import { ArrowRightIcon } from "lucide-react";
import Textarea from "@/components/ui/textarea";
import { blurInViewVariant } from "@/lib/motion/utils";
import SubmitButton from "@/components/helpers/submit-button";
import { MotionDiv } from "@/components/helpers/basic-lazy-motion";
import { submitContactForm } from "@/modules/contact/server/actions";
import useClientFormSubmission from "@/hooks/useClientFormSubmission";

export type ContactFormProps = ComponentProps<"form">;
const ContactForm = ({ className, ...props }: ContactFormProps) => {
  const { handleFormSubmit } = useClientFormSubmission({
    action: submitContactForm,
  });
  return (
    <form
      {...props}
      onSubmit={handleFormSubmit}
      className={cn("flex flex-col gap-4", className)}
    >
      <MotionDiv
        {...blurInViewVariant(0.1)}
        className="flex max-sm:flex-col gap-2"
      >
        <Input
          name="firstName"
          label="First Name"
          placeholder="First Name"
          parentClassName="w-full"
          labelClassName="font-medium"
        />
        <Input
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          parentClassName="w-full"
          labelClassName="font-medium"
        />
      </MotionDiv>
      <MotionDiv {...blurInViewVariant(0.2)}>
        <Input
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          labelClassName="font-medium"
        />
      </MotionDiv>
      <MotionDiv {...blurInViewVariant(0.3)}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          labelClassName="font-medium"
        />
      </MotionDiv>
      <MotionDiv {...blurInViewVariant(0.4)}>
        <Input
          name="subject"
          label="Subject"
          placeholder="Subject"
          labelClassName="font-medium"
        />
      </MotionDiv>
      <MotionDiv {...blurInViewVariant(0.5)}>
        <Textarea
          rows={5}
          name="message"
          label="Message"
          placeholder="Message"
          labelClassName="font-medium"
        />
      </MotionDiv>
      <MotionDiv {...blurInViewVariant(0.6)}>
        <div className="flex gap-2 justify-end">
          <p className="text-sm text-muted">
            By submitting this form, you agree to our privacy policy and terms
            of service.
          </p>
          <SubmitButton type="submit" className="group">
            Send Message
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </SubmitButton>
        </div>
      </MotionDiv>
    </form>
  );
};

export default ContactForm;
