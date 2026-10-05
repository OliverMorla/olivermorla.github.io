export type Quote = {
  id: number;
  name: string;
  role: string;
  message: string;
  image?: string;
};

// Testimonials come from Payload. Imported lazily so the page still renders
// (without quotes) when the CMS database is unreachable, e.g. local dev.
export async function getQuotes(): Promise<Quote[]> {
  try {
    const { getTestimonials } = await import("@/lib/payload/server/queries");
    const docs = await getTestimonials();
    return docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      role: [doc.role, doc.company].filter(Boolean).join(", ") || doc.location,
      message: doc.message,
      image:
        typeof doc.image === "object" && doc.image?.url
          ? doc.image.url
          : undefined,
    }));
  } catch {
    return [];
  }
}
