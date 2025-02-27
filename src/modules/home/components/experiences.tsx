import { experienceHistory, achievements } from "@/constants";
import SectionTitle from "@/modules/app/components/section-title";
import ExperienceCard from "@/modules/experiences/components/card";
import AchievementCard from "@/modules/achievement/components/card";

const Experiences = () => {
  return (
    <section
      id="experiences"
      className="relative h-auto w-full flex flex-col justify-center items-center py-24 max-sm:p-4 gap-6 bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <section className="container mx-auto flex flex-col items-center gap-10 relative">
        <SectionTitle
          title="Experiences"
          description="Charting my professional growth through diverse roles, each enriching my skill set and deepening my industry knowledge."
        />

        <div className="mx-auto flex items-start justify-center gap-8 sm:gap-2 flex-col relative">
          <div className="absolute left-4 top-0 w-[2px] h-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 -z-10" />
          {experienceHistory.map((job, index) => (
            <ExperienceCard
              key={index}
              y={40}
              index={index}
              delay={index * 0.2}
              position={job.position}
              endDate={job.endDate}
              location={job.location}
              startDate={job.startDate}
              companyName={job.companyName}
              responsibilities={job.responsibilities}
              totalNumberOfCards={experienceHistory.length}
            />
          ))}
        </div>

        {/* <div className="flex gap-10 items-start flex-wrap max-sm:w-full">
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
                fontAwesomeIconUrl={education.faIconUrl}
              />
            ))}
          </div>
        </div>
        */}
        <div className="flex flex-col items-center gap-10">
          {/* <div className="text-center flex flex-col items-center">
            <h1 className="relative uppercase font-bold text-5xl tracking-tight w-fit">
              <span className="relative z-20">Achievements</span>
              <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-blue-500 to-purple-500 -skew-x-12"></span>
            </h1>
            <p className="opacity-60">
              Showcasing key milestones and recognitions that reflect my
              dedication and success in the realm of full-stack development.
            </p>
          </div> */}
          <SectionTitle
            title="Achievements"
            description="Showcasing key milestones and recognitions that reflect my dedication and success in the realm of full-stack development."
          />
          <div className="flex flex-col items-center gap-6">
             {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                impact={achievement.impact}
                description={achievement.description}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Experiences;
