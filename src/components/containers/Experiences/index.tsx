import { education, experienceHistory, achievements } from "@/constants";
import ExperienceCard from "@/components/ui/Cards/Experience";
import EducationCard from "@/components/ui/Cards/Education";
import SectionTitle from "@/components/ui/SectionTitle";
import AchievementCard from "@/components/ui/Cards/Achievement";
import Arrow from "@/components/ui/Arrow";

const ExperiencesSection = () => {
  return (
    <section
      className="relative h-auto bg-[--color-dark-gray] text-white w-full flex items-center flex-col p-10 gap-10"
      id="experiences"
    >
      <SectionTitle
        title={"Experiences"}
        desc={
          "Charting my professional growth through diverse roles, each enriching my skill set and deepening my industry knowledge."
        }
      />

      <div className="h-full w-full flex items-center justify-center gap-2 flex-col">
        {experienceHistory.map((job, index) => (
          <ExperienceCard
            key={index}
            companyName={job.companyName}
            jobPosition={job.position}
            jobResponsibilities={job.responsibilities}
            jobStartDate={job.startDate}
            jobEndDate={job.endDate}
            jobLocation={job.location}
          />
        ))}
        <Arrow>
          <div className="h-40 w-[1px] bg-[--color-electric-purple] max-md:hidden"></div>
        </Arrow>
      </div>

      <div className="flex gap-10 items-start flex-wrap max-sm:w-full">
        <div className="flex flex-col items-center max-w-[600px]">
          <Arrow>
            <div className="h-40 w-[1px] bg-[--color-electric-purple] max-md:hidden"></div>
            <div className="h-[1px] w-64 bg-[--color-electric-purple] absolute max-md:hidden"></div>
          </Arrow>
          <SectionTitle
            title={"Education"}
            desc={
              "Highlighting my academic background and specialized training that lay the foundation for my expertise in full-stack development."
            }
          />
          <div className="h-full w-full flex items-center justify-center gap-4 flex-col">
            {education.map((education, index) => (
              <EducationCard
                key={index}
                educationInstitution={education.institution}
                educationDegree={education.degree}
                fontAwesomeIconUrl={education.fontAwesomeIconUrl}
              />
            ))}
          </div>
        </div>

        <div className="max-w-[600px] w-full">
          <SectionTitle
            title={"Achievements"}
            desc={
              "Showcasing key milestones and recognitions that reflect my dedication and success in the realm of full-stack development."
            }
          />
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              description={achievement.description}
              impact={achievement.impact}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
