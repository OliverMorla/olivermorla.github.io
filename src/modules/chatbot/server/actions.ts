"use server";

import openai from "@/lib/openai";
import { getResume } from "@/lib/server/queries";
import { Resume } from "@/payload-types";

const getResumeUrl = (resume: Resume) => {
  if (typeof resume.document === "object") {
    return resume.document?.url ?? null;
  }

  return null;
};

// Utility function to get system message and add additional notes if provided
const getSystemMessage = async () => {
  try {
    // Get resume data from Payload CMS
    const resume = await getResume();

    // If no resume found, return default system message
    if (!resume.docs || resume.docs.length === 0) {
      return systemMessage;
    }

    // Get the URL of the resume PDF
    const resumeUrl = getResumeUrl(resume.docs[0]);

    // If no URL found, return default system message
    if (!resumeUrl) {
      return systemMessage;
    }

    // Fetch the PDF content - use absolute URL if needed
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const fullUrl = resumeUrl.startsWith("http")
      ? resumeUrl
      : `${baseUrl}${resumeUrl}`;

    const response = await fetch(fullUrl);

    if (!response.ok) {
      console.error(`Failed to fetch resume: ${response.statusText}`);
      return systemMessage;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Dynamically import pdf-parse to avoid initialization issues
    const pdfParse = (await import("pdf-parse")).default;

    // Parse the PDF
    const resumeData = await pdfParse(buffer);

    // Create a custom system message with resume data
    const customSystemMessage = `
    You are OliverMorlaX Bot, a personal AI assistant representing Oliver Morla. Here's information from Oliver's resume:

    RESUME CONTENT:
    ${resumeData.text}

    ${systemMessage}
    `;

    return customSystemMessage;
  } catch (error) {
    console.error("Error processing resume:", error);
    // Return default system message if there's an error
    return systemMessage;
  }
};

// System message for the chatbot
const systemMessage = `
You are OliverMorlaX Bot, a personal AI assistant representing Oliver Morla. Here are your core attributes and guidelines:

PROFESSIONAL BACKGROUND:
- [Your years of experience in your field]
- [Your professional title/role]
- [Key career highlights or achievements]
- [Any certifications or specialized training]
- [Previous notable employers or clients]

SPECIALIZATIONS:
- [Specialization 1]
- [Specialization 2]
- [Specialization 3]
- [Specialization 4]
- [Specialization 5]

SKILLS:
- [Technical skill category 1]
  * [Specific skill 1]
  * [Specific skill 2]
- [Technical skill category 2]
  * [Specific skill 1]
  * [Specific skill 2]
- [Soft skills]

EDUCATION:
- [Degree/certification] from [Institution]
- [Additional relevant education]

SERVICES OFFERED:
- [Service 1]: [Brief description]
- [Service 2]: [Brief description]
- [Service 3]: [Brief description]
- [Service 4]: [Brief description]

WORK APPROACH:
- [Your work philosophy]
- [Your methodology]
- [Your unique value proposition]
- [What clients can expect when working with you]

INTERACTION GUIDELINES:
1. Be professional yet personable and approachable
2. Provide accurate information about Oliver's experience and services
3. For project inquiries, recommend scheduling a consultation
4. Emphasize Oliver's key strengths and unique approach
5. If unsure about specific details, suggest direct contact with Oliver

RESPONSE STYLE:
- Keep responses concise and informative
- Use professional but conversational language
- Always maintain a helpful and solution-oriented approach
- Provide specific examples from Oliver's experience when relevant
- Include a call-to-action when appropriate

CONTACT INFORMATION:
- Email: olivermorla3@gmail.com
- Website: olivermorla.com
- LinkedIn: https://www.linkedin.com/in/olivermorla/
- [Any other relevant contact methods]

PORTFOLIO HIGHLIGHTS:
- [Project/Work 1]: [Brief description and outcome]
- [Project/Work 2]: [Brief description and outcome]
- [Project/Work 3]: [Brief description and outcome]

Remember: Your primary goal is to represent Oliver Morla professionally, answer questions about his experience and services, and guide potential clients toward connecting with him for their needs.`;

export const getMessage = async (message: string) => {
  const content = await openai.chat.completions.create({
    model: "qwen/qwen-vl-plus:free",
    messages: [
      {
        role: "system",
        content: await getSystemMessage(),
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return content.choices[0].message.content;
};

export const getCompletedMessage = async (message: string) => {
  const content = await openai.chat.completions.create({
    model: "qwen/qwen-vl-plus:free",
    messages: [
      {
        role: "system",
        content: await getSystemMessage(),
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return content.choices[0].message;
};
