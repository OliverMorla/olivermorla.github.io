"use server";

import z from "zod";
import { aj } from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { mailjet } from "@/lib/mailjet";
import { SendEmailV3_1 } from "node-mailjet";
import { submitContactFormSchema } from "../lib/schema";

export const submitContactForm = async (formData: FormData) => {
  const req = await request();

  const decision = await aj.protect(req, { requested: 1 });

  if (!decision.isAllowed()) {
    return {
      ok: false,
      message: "Too many requests! please try again later",
    };
  }

  const formFields = Object.fromEntries(formData) as z.infer<
    typeof submitContactFormSchema
  >;
  const validation = submitContactFormSchema.safeParse(formFields);

  if (!validation.success) {
    return {
      ok: false,
      formFields,
      ...validation.error.flatten(),
      message: "Invalid form data, please check your inputs",
    };
  }

  // Define the email data
  const emailData: SendEmailV3_1.Body = {
    Messages: [
      {
        To: [
          {
            Email: "olivermorla3@gmail.com",
            Name: "Oliver Morla",
          },
        ],
        From: { Email: "no-reply@olivermorla.com", Name: "Oliver Morla" },
        Subject: `Oliver Morla - New message from ${validation.data.firstName}`,
        HTMLPart: `<p>Name: ${validation.data.firstName} ${validation.data.lastName}</p>
        <p>Email: ${validation.data.email}</p>
        <p>Phone Number: ${validation.data.phoneNumber}</p>
        <p>Subject: ${validation.data.subject}</p>
        <p>Message: ${validation.data.message}</p>`,
      },
    ],
  };

  try {
    // Send an email using the Mailjet client
    await mailjet
      .post("send", {
        version: "v3.1",
      })
      .request(emailData);

    // If the email was sent successfully, return a success response
    return {
      ok: true,
      formFields: {},
      message: "Email sent successfully",
    };
  } catch (err) {
    console.log("Error sending email", err);

    // If the email failed to send, return an error response
    return {
      ok: false,
      message: "Failed to send email",
    };
  }
};
