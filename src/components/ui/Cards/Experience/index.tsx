"use client";
import React from "react";
import { cn } from "@/utils";
import { MotionInViewDiv, MotionProps } from "@/components/helpers/Motion";

interface ExperienceCardProps {
  companyName: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  index: number;
  totalNumberOfCards: number;
  responsibilities: string[];
}

const ExperienceCard = React.forwardRef<
  HTMLDivElement,
  ExperienceCardProps & MotionProps<"div">
>(
  (
    {
      companyName,
      position,
      location,
      startDate,
      endDate,
      responsibilities,
      index,
      totalNumberOfCards,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <MotionInViewDiv
        once
        y={40}
        delay={0.2}
        type="tween"
        className={cn("flex justify-start max-sm:flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center min-w-[250px]">
          <h2 className="font-bold text-xl">{companyName}</h2>
          {index !== totalNumberOfCards - 1 && (
            <div className="h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 max-sm:hidden"></div>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="italic font-bold">
            <span> {position} / </span>
            <span className="text-xs font-normal"> {location}</span>
          </h3>
          <p className="opacity-60 text-xs">
            {startDate} - {endDate}
          </p>
          <div className="flex items-start gap-2">
            {index !== totalNumberOfCards - 1 && (
              <div className="h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 m-3 sm:hidden"></div>
            )}
            <ul className="opacity-80 list-disc">
              {responsibilities.map((desc: string, index: number) => (
                <li className="ml-10" key={index}>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </MotionInViewDiv>
    );
  }
);

ExperienceCard.displayName = "ExperienceCard";

export default ExperienceCard;
