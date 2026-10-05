import type { ContactField } from "@/modules/contact/lib/state";
import { z } from "zod";

// Server-side validation. Client code imports from `state.ts` instead.
export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name.").max(100),
  lastName: z.string().trim().max(100),
  email: z
    .string()
    .trim()
    .max(254)
    .pipe(z.email("Enter a valid email address.")),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Enter a phone number I can reach you on.")
    .max(30),
  subject: z.string().trim().min(1, "Add a subject.").max(200),
  message: z
    .string()
    .trim()
    .min(1, "Tell me a little about your project.")
    .max(5000, "Keep the message under 5,000 characters."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Fails to compile if the schema and the client-side field list drift apart.
type Assert<T extends true> = T;
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
export type _ContactFieldsInSync = Assert<
  Same<ContactField, keyof ContactFormData>
>;

export const contactFields = Object.keys(
  contactFormSchema.shape,
) as ContactField[];
