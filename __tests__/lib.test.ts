import { getMediaImage } from "@/lib/payload/client/utils";
import { contactFormSchema } from "@/modules/contact/lib/schema";
import { formatYear } from "@/utils/date";
import { escapeHtml } from "@/utils/escape-html";

describe("escapeHtml", () => {
  it("neutralises markup from visitor input", () => {
    expect(escapeHtml(`<img src=x onerror="alert('hi')">&`)).toBe(
      "&lt;img src=x onerror=&quot;alert(&#39;hi&#39;)&quot;&gt;&amp;",
    );
  });

  it("leaves plain text untouched", () => {
    expect(escapeHtml("Hello, Oliver")).toBe("Hello, Oliver");
  });
});

describe("formatYear", () => {
  it("returns the UTC year of an ISO date", () => {
    expect(formatYear("2024-01-01T00:00:00.000Z")).toBe("2024");
  });

  it("returns null for missing or invalid dates", () => {
    expect(formatYear(null)).toBeNull();
    expect(formatYear("not a date")).toBeNull();
  });
});

describe("getMediaImage", () => {
  const timestamps = { createdAt: "", updatedAt: "" };

  it("uses the upload's URL and intrinsic size", () => {
    expect(
      getMediaImage({
        id: 1,
        url: "/api/media/file/shot.webp",
        width: 1600,
        height: 1000,
        ...timestamps,
      }),
    ).toEqual({ src: "/api/media/file/shot.webp", width: 1600, height: 1000 });
  });

  it("falls back to the placeholder for unpopulated uploads", () => {
    expect(getMediaImage(42).src).toBe("/placeholder.svg");
    expect(getMediaImage(null).src).toBe("/placeholder.svg");
  });
});

describe("contactFormSchema", () => {
  const valid = {
    firstName: " Ada ",
    lastName: "",
    email: "ada@example.com",
    phoneNumber: "(347) 555-0100",
    subject: "New app",
    message: "I need an MVP.",
  };

  it("accepts a complete message and trims whitespace", () => {
    const result = contactFormSchema.safeParse(valid);

    expect(result.success).toBe(true);
    expect(result.data?.firstName).toBe("Ada");
  });

  it("rejects an invalid email with a field-level message", () => {
    const result = contactFormSchema.safeParse({ ...valid, email: "nope" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["email"]);
  });

  it("caps the message length", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      message: "a".repeat(5001),
    });

    expect(result.success).toBe(false);
  });
});
