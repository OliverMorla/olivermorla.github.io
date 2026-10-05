import { notFound } from "next/navigation";

// The app has several root layouts (site, Payload, preview), so there is no
// single root not-found. Unmatched URLs land here and render the site's
// not-found page inside the site header and footer.
//
// No params are prebuilt and dynamic params are off, so every match is
// rejected at the routing layer with a real 404 status, before any HTML
// streams (a streamed notFound() would have to send 200).
export const dynamicParams = false;

export function generateStaticParams(): { slug: string[] }[] {
  return [];
}

export default function CatchAll() {
  notFound();
}
