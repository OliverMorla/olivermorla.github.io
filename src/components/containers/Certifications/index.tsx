import { certifications } from "@/constants";
import CertificationCard from "@/components/ui/Cards/Certification";
import SectionTitle from "@/components/ui/SectionTitle";

const CertificationsSection = () => {
  return (
    <section
      className="h-auto bg-[--color-dark-gray] text-[--text-color] flex justify-center items-center flex-wrap p-10"
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
      <div className="relative max-w-md flex gap-10 overflow-x-scroll p-10 max-sm:p-0 items-center h-[500px] z-10">
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
