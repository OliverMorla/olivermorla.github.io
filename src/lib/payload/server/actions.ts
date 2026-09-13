"use server";

import { getTestimonials as getTestimonialsQuery } from "@/lib/payload/server/queries";

export const getTestimonials = async () => getTestimonialsQuery();
