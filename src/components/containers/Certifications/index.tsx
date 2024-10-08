import { certifications } from "@/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import CertificationCard from "@/components/ui/Cards/Certification";

const CertificationsSection = () => {
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
        {certifications[0].certs?.map((title, index) => (
          <CertificationCard
            key={index}
            title={title}
            institution={certifications[0].institution!}
          />
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;
