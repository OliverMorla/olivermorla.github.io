"use client";

import { MotionSection } from "@/components/helpers/basic-lazy-motion";
import SectionTitle from "@/modules/app/components/section-title";
import { pages } from "@/modules/app/lib/constants";
import ContactForm from "@/modules/contact/components/form";
import { useTransform } from "framer-motion";
import { useScrollTracking } from "./scroll-tracking-container";

const Contact = () => {
  const { smoothYProgress } = useScrollTracking();
  const scale = useTransform(smoothYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(smoothYProgress, [0, 1], [-5, 0]);

  return (
    <MotionSection
      id="contact"
      className="sm:sticky sm:top-0 min-h-screen flex flex-col gap-6 p-8 max-sm:p-4 bg-gradient-none-inverted"
      style={{ scale, rotate, willChange: "transform", transformOrigin: "50% 50%" }}
    >
      <div className="relative container mx-auto flex flex-col items-center gap-12">
        <div className="absolute inset-0 bg-grid-pattern bg-grid-pattern-lg opacity-5" />
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
    </MotionSection>
  );
};

export default Contact;
