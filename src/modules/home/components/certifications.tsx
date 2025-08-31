import { getCertifications } from "@/lib/payload/server/queries";
import SectionTitle from "@/modules/app/components/section-title";
import CertificationCard from "@/modules/certifications/components/card";

const Certifications = async () => {
  // get the data from the cache
  const certifications = await getCertifications();

  // check if the data exists
  const doesCertificationsExist = !!certifications.docs.length;

  // if the data does not exist, don't render the component
  if (!doesCertificationsExist) return null;

  return (
    <section
      id="certifications"
      className="h-auto flex flex-col justify-center items-center py-24 px-8 max-sm:px-4 overflow-hidden"
    >
      <SectionTitle
        title="Certifications"
        description={
          "Evidence of my ongoing commitment to professional development, featuring key certifications in technology and development methodologies."
      }
      />
      <div className="relative flex w-full gap-12 overflow-x-auto p-8 max-sm:py-4">
        {certifications.docs.map((certification, idx) => (
          <div key={idx} className="flex justify-center items-center">
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
