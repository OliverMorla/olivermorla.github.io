import { cache } from "react";
import { payload } from "@/lib/payload";
import SectionTitle from "@/components/ui/SectionTitle";
import CertificationCard from "@/components/ui/Cards/Certification";
import { MotionInViewDiv } from "@/components/helpers/LazyMotion";
import { MotionDiv } from "@/components/helpers/Motion";

const getCertifications = cache(async () => {
  return await payload.find({
    collection: "certifications",
    sort: "position:asc",
  });
});

const Certifications = async () => {
  const certifications = await getCertifications();

  const doesCertificationsExist = !!certifications.docs.length;

  if (!doesCertificationsExist) return null;

  return (
    <section
      id="certifications"
      className="h-auto flex flex-col justify-center items-center py-24 px-8 max-sm:px-4 overflow-hidden"
    >
      <SectionTitle
        title="Certifications"
        desc={
          "Evidence of my ongoing commitment to professional development, featuring key certifications in technology and development methodologies."
        }
      />
      <div className="relative flex w-full gap-10 overflow-x-auto p-8 max-sm:p-4">
        {certifications.docs.map((certification, index) => (
          <div key={index} className="flex justify-center items-center">
            <CertificationCard
              title={certification.title}
              institution={certification.issuer ?? "Certification"}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;

export const revalidate = 24 * 60 * 60 * 1000; // 24 hours
