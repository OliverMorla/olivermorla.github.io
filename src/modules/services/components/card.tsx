"use client";

import FontAwesomeIcon from "@/modules/app/components/dynamic/font-awesome-icon";
import { cn } from "@/utils/classNames";
import {
  faCheckCircle,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { ComponentProps } from "react";

export type ServiceCardProps = ComponentProps<"div"> &
  Readonly<{
    service: {
      title: string;
      price: string;
      features: string[];
      libraries: string[];
      description: string;
      faIconUrl: IconDefinition;
    };
  }>;

const ServiceCard = ({ service, className, ...props }: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-grow cursor-pointer flex-col items-start gap-6 rounded-md border border-neutral-300/75 p-8 shadow-sm transition ease-in-out hover:border-indigo-400 hover:shadow-md max-sm:p-4 sm:max-w-lg dark:border-neutral-700/75",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-4xl font-bold tracking-tighter max-sm:text-4xl">
            {service.title}
          </h1>
          <FontAwesomeIcon icon={service.faIconUrl} className="text-4xl" />
        </div>
        <p className="opacity-70">{service.description}</p>
      </div>
      <p className="text-lg font-medium opacity-70">{service.price}</p>
      <div className="flex flex-wrap gap-2">
        {service.libraries.map((library, index) => (
          <p
            key={index}
            className="rounded-md bg-neutral-200 p-2 dark:bg-neutral-800"
          >
            {library}
          </p>
        ))}
      </div>
      <ul className="mt-auto">
        {service.features.map((feature, index) => (
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
