import { pages } from "@/modules/app/lib/constants";
import ContactForm from "@/modules/contact/components/form";
import SectionTitle from "@/modules/app/components/section-title";

const Contact = () => {
  return (
    <section
      id="contact"
      className="sticky top-0 min-h-screen flex flex-col gap-6 p-8 max-sm:p-4 bg-gradient-none-inverted"
    >
      <div className="relative container mx-auto flex flex-col items-center gap-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-pattern-neutral-600 bg-grid-pattern-lg opacity-50" />
        <div className="relative z-10 flex flex-col items-center gap-12">
          <SectionTitle
            tagline={pages.contact.tagline}
            title={pages.contact.title}
            description={pages.contact.description}
            subtitle={pages.contact.subtitle}
          />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
