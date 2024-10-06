import { certifications } from "@/constants";
import CertificationCard from "@/components/ui/Cards/Certification";
import SectionTitle from "@/components/ui/SectionTitle";

const CertificationsSection = () => {
  return (
    <section
      className="h-auto flex flex-col justify-center items-center p-8 max-sm:p-4 overflow-hidden"
      id="certifications"
      style={{
        paddingTop: "250px",
      }}
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
