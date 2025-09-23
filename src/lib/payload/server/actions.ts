"use server";

import { payload } from "@/lib/payload";
import { cache } from "react";

export const getTestimonials = cache(async () => {
  return payload.find({
    collection: "testimonials",
    sort: "position:asc",
    limit: 3,
  });
});

export const getCertifications = cache(async () => {
  return await payload.find({
    collection: "certifications",
    sort: "position:asc",
  });
});

export const getProjects = cache(async (status?: string) => {
  return await payload.find({
    collection: "projects",
    sort: "position:asc",
    where: status
      ? {
          status: {
            equals: status,
          },
        }
      : undefined,
  });
});

export const getProjectStatuses = cache(async () => {
  const projects = await payload.find({
    collection: "projects",
    sort: "position:asc",
  });
  return Array.from(new Set(projects.docs.map((project) => project.status)));
});

export const getResume = cache(async () => {
  return await payload.find({ collection: "resume", sort: "position:asc" });
});
