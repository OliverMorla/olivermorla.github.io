// Client-safe contact form types. Kept apart from `schema.ts` so the form
// component doesn't pull zod into the browser bundle.

export type ContactField =
  "firstName" | "lastName" | "email" | "phoneNumber" | "subject" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string[]>>;
  // Echoed back on error so the form can restore what was typed.
  fields?: Partial<Record<ContactField, string>>;
};

export const initialContactFormState: ContactFormState = { status: "idle" };
