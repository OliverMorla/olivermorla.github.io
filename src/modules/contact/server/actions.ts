"use server";

import { getArcjet } from "@/lib/arcjet";
import { getMailjet } from "@/lib/mailjet";
import { contactEmail } from "@/modules/app/lib/constants";
import {
  contactFields,
  contactFormSchema,
  type ContactFormData,
} from "@/modules/contact/lib/schema";
import type { ContactFormState } from "@/modules/contact/lib/state";
import { escapeHtml } from "@/utils/escape-html";
import { request } from "@arcjet/next";
import * as Sentry from "@sentry/nextjs";
import type { SendEmailV3_1 } from "node-mailjet";
import { z } from "zod";

const buildEmail = (data: ContactFormData): SendEmailV3_1.Body => {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", data.email],
    ["Phone", data.phoneNumber],
    ["Subject", data.subject],
    ["Message", data.message],
  ];

  return {
    Messages: [
      {
        To: [{ Email: contactEmail, Name: "Oliver Morla" }],
        From: { Email: "no-reply@olivermorla.com", Name: "Oliver Morla" },
        ReplyTo: { Email: data.email, Name: name },
        Subject: `New message from ${name}: ${data.subject}`,
        TextPart: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
        // Every value is escaped: this HTML is built from visitor input.
        HTMLPart: rows
          .map(
            ([label, value]) =>
              `<p><strong>${label}:</strong> ${escapeHtml(value).replaceAll("\n", "<br>")}</p>`,
          )
          .join(""),
      },
    ],
  };
};

export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const fields = Object.fromEntries(
    contactFields.map((key) => [key, String(formData.get(key) ?? "")]),
  ) as Record<keyof ContactFormData, string>;

  // Validate locally before spending a network round trip on bot checks.
  const validation = contactFormSchema.safeParse(fields);
  if (!validation.success) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: z.flattenError(validation.error).fieldErrors,
      fields,
    };
  }

  try {
    const decision = await getArcjet().protect(await request(), {
      requested: 1,
    });

    if (decision.isDenied()) {
      return {
        status: "error",
        message: decision.reason.isRateLimit()
          ? "Too many messages in a short time. Wait a minute and try again."
          : `This message was blocked. Email me at ${contactEmail} instead.`,
        fields,
      };
    }

    await getMailjet()
      .post("send", { version: "v3.1" })
      .request(buildEmail(validation.data));

    return {
      status: "success",
      message: `Message sent. I'll reply to ${validation.data.email}.`,
    };
  } catch (error) {
    Sentry.captureException(error);

    return {
      status: "error",
      message: `Your message didn't send. Try again, or email me at ${contactEmail}.`,
      fields,
    };
  }
}
