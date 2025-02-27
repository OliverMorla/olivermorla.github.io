import { MotionInViewDiv } from "@/components/helpers/dynamic/Motion";

const AchievementCard = ({
  description,
  impact,
}: {
  description: string;
  impact: string;
}) => {
  return (
    <MotionInViewDiv
      once
      y={40}
      delay={0.2}
      className="flex flex-col items-center"
    >
      <h2 className="font-bold text-xl text-center">{description}</h2>
      <p className="opacity-60">{impact}</p>
    </MotionInViewDiv>
  );
};

export default AchievementCard;
