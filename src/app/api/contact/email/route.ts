import { emailParser, mailjet } from "@/lib/mailjet";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Extract data from the request body
  const { name, email, message } = await req.json();

  const html = `
    <h4>From: ${name}</h4>
    <h4>Email: ${email}</h4>
    <p>${message}</p>
  `;

  const emailData = emailParser({
    toName: "Oliver ",
    toEmail: "olivermorla3@gmail.com",
    fromName: "Oliver Morla",
    fromEmail: "no-reply@olivermorla.com",
    subject: `Portfolio - New message from ${name}`,
    html: html,
    text: message,
  });

  try {
    // Send an email using the Mailjet client
    await mailjet
      .post("send", {
        version: "v3.1",
      })
      .request(emailData);

    // If the email was sent successfully, return a success response
    return NextResponse.json({
      ok: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    console.log(err);

    // If the email failed to send, return an error response
    return NextResponse.json({
      ok: false,
      message: "Failed to send email",
    });
  }
}
