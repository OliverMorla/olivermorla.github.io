import { serviceIcons } from "@/components/ui/icons";
import type { listOfServices } from "@/modules/app/lib/constants";
import { cn } from "@/utils/classNames";
import { Check } from "lucide-react";
import type { ComponentProps } from "react";

export type ServiceCardProps = ComponentProps<"article"> & {
  service: (typeof listOfServices)[number];
};

const ServiceCard = ({ service, className, ...props }: ServiceCardProps) => {
  const Icon = serviceIcons[service.icon];

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-6 rounded-xl border border-neutral-300 bg-white/60 p-6 shadow-sm transition-colors hover:border-indigo-400 sm:p-8 dark:border-neutral-800 dark:bg-neutral-950/60 dark:hover:border-indigo-500",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
          <Icon aria-hidden className="size-7 shrink-0 text-indigo-500" />
        </div>
        <p className="text-muted text-pretty">{service.description}</p>
      </div>

      <ul aria-label="Tools" className="flex flex-wrap gap-2">
        {service.libraries.map((library) => (
          <li
            key={library}
            className="rounded-md bg-neutral-100 px-2.5 py-1 text-sm dark:bg-neutral-800"
          >
            {library}
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-col gap-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check
              aria-hidden
              className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default ServiceCard;
