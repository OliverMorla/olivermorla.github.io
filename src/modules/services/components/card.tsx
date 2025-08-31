"use client";

import React, { ComponentProps } from "react";
import { cn } from "@/utils/classNames";
import {
  faCheckCircle,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "@/modules/app/components/dynamic/font-awesome-icon";

interface ServiceCardProps extends ComponentProps<"div"> {
  index: number;
  totalServices: number;
  title: string;
  description: string;
  libraries: string[];
  features: string[];
  price: string;
  faIconUrl: IconDefinition;
}

const ServiceCard = ({
  totalServices,
  title,
  description,
  libraries,
  features,
  price,
  faIconUrl,
  ...props
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "relative transform flex flex-col gap-6 max-w-lg max-sm:max-w-full w-full items-start cursor-pointer shadow-sm dark:shadow-[var(--color-primary-dark)] p-8 max-sm:p-4 border-[1px] border-neutral-200 dark:border-neutral-800 rounded-md flex-grow sm:max-h-[525px] hover:shadow-md hover:dark:shadow-[var(--color-primary-dark)] transition-all duration-300 hover:border-[var(--color-primary-light)]"
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tighter max-sm:text-4xl">
            {title}
          </h1>
          <FontAwesomeIcon icon={faIconUrl} className="text-4xl" />
        </div>
        <p className="opacity-70">{description}</p>
      </div>
      <p className="opacity-70 text-lg font-medium">{price}</p>
      <div className="flex flex-wrap gap-2">
        {libraries.map((library, index) => (
          <p
            key={index}
            className="bg-neutral-200 dark:bg-neutral-800 p-2 rounded-md"
          >
            {library}
          </p>
        ))}
      </div>
      <ul className="mt-auto">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} />
            <p className="text-base">{feature}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
