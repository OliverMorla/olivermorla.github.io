import { cn } from "@/utils/classNames";
import { ComponentProps } from "react";

export type AchievementCardProps = ComponentProps<"div"> & {
  name?: string;
  impact?: string;
  description: string;
};

const AchievementCard = ({
  name,
  impact,
  description,
  className,
  ...props
}: AchievementCardProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)} {...props}>
      <h2 className="font-bold text-xl text-center">{description}</h2>
      <p className="opacity-60">{impact}</p>
    </div>
  );
};

export default AchievementCard;
