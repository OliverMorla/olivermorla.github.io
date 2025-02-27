import { MotionInViewDiv } from "@/components/helpers/dynamic/Motion";

const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <MotionInViewDiv
      // once
      // y={40}
      // delay={0.2}
      className="text-center flex flex-col items-center"
    >
      <h1 className="relative uppercase font-bold text-6xl max-sm:text-4xl tracking-tight w-fit">
        <span className="relative z-20">{title}</span>
        <span className="absolute left-0 bottom-0 z-0 inline-block w-full h-1/2 bg-gradient-to-r from-neutral-300 to-neutral-300 dark:from-neutral-700 dark:to-stone-700 -skew-x-12"></span>
      </h1>
      <p className="opacity-60">{description}</p>
    </MotionInViewDiv>
  );
};

export default SectionTitle;
