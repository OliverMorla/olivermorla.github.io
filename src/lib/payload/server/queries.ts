import "server-only";

import { getPayloadClient, isCmsConfigured } from "@/lib/payload";
import { cache } from "react";

// Every query is wrapped in React.cache so components that need the same data
// in one request (e.g. TrustBar and Testimonials) share a single DB round trip.
// `pagination: false` skips Payload's extra COUNT query, `select` keeps the
// payload (and the RSC props built from it) down to the fields we render, and
// an explicit `limit` keeps every query bounded as the CMS grows.

const findTestimonials = async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "testimonials",
    sort: "position",
    limit: 3,
    depth: 1,
    pagination: false,
    select: {
      name: true,
      message: true,
      location: true,
      role: true,
      company: true,
      image: true,
      rating: true,
    },
  });
  return docs;
};

export type TestimonialSummary = Awaited<
  ReturnType<typeof findTestimonials>
>[number];

export const getTestimonials = cache(async (): Promise<TestimonialSummary[]> =>
  isCmsConfigured ? findTestimonials() : [],
);

const findProjects = async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    sort: "position",
    limit: 100,
    depth: 1,
    pagination: false,
    select: {
      title: true,
      description: true,
      category: true,
      status: true,
      link: true,
      featured: true,
      startedAt: true,
      stack: true,
      images: true,
    },
  });
  return docs;
};

export type ProjectSummary = Awaited<ReturnType<typeof findProjects>>[number];

export const getProjects = cache(async (): Promise<ProjectSummary[]> =>
  isCmsConfigured ? findProjects() : [],
);

const findResume = async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "resume",
    limit: 1,
    depth: 1,
    pagination: false,
    select: { document: true, content: true },
  });
  return docs[0] ?? null;
};

export type ResumeEntry = NonNullable<Awaited<ReturnType<typeof findResume>>>;

export const getResume = cache(async (): Promise<ResumeEntry | null> =>
  isCmsConfigured ? findResume() : null,
);
