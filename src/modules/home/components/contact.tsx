import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import ContactForm from "@/modules/contact/components/form";

/** Server shell; only the form itself is a client component. */
const Contact = () => (
  <section
    id="contact"
    className="stack-in bg-gradient-none-inverted flex min-h-svh flex-col gap-6 px-4 py-24 sm:sticky sm:top-0 sm:px-8"
  >
    <div className="relative container mx-auto flex flex-col items-center gap-12">
      <div
        aria-hidden
        className="bg-grid-pattern bg-grid-pattern-lg absolute inset-0 opacity-5"
      />
      <SectionTitle
        tagline={pages.contact.tagline}
        title={pages.contact.title}
        description={pages.contact.description}
        subtitle={pages.contact.subtitle}
        className="relative"
      />
      <ContactForm className="relative w-full max-w-2xl" />
    </div>
  </section>
);

export default Contact;
