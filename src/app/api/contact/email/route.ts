import { mailjet } from "@/lib/mailjet";
import { SendEmailV3_1 } from "node-mailjet";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Extract data from the request body
  const { name, email, message } = await req.json();

  const emailData: SendEmailV3_1.Body = {
    Messages: [
      {
        From: { Email: "no-reply@olivermorla.com", Name: "Oliver Morla" },
        To: [{ Email: "olivermorla3@gmail.com", Name: "Oliver" }],
        Subject: `Portfolio - New message from ${name}`,
        HTMLPart: `
            <h4>From: ${name}</h4>
            <h4>Email: ${email}</h4>
            <p>${message}</p>
        `,
      },
    ],
  };

  // Send an email using the Mailjet client
  const sendMail = await mailjet
    .post("send", {
      version: "v3.1",
    })
    .request(emailData);

  //  If the email failed to send, return an error response
  if (sendMail.response.statusText !== "OK") {
    return NextResponse.json({
      ok: false,
      message: "Email failed to send. Please try again later.",
    });
  }

   // If the email was sent successfully, return a success response
  return NextResponse.json({
    ok: true,
    message: "Email sent successfully.",
  });
}
