import { cache } from "react";
import { payload } from "../payload";

// create a cache function to get the data from the payload
export const getTestimonials = cache(async () => {
  return payload.find({ collection: "testimonials", limit: 3 });
});

// create a cache function to get the data from the payload
export const getCertifications = cache(async () => {
  return await payload.find({
    collection: "certifications",
    sort: "position:asc",
  });
});

// create a cache function to get the data from the payload
export const getProjects = cache(async () => {
  return await payload.find({ collection: "projects", sort: "position:asc" });
});
