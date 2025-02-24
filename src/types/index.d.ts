import { FaPresetIconsTypes } from "@/constants";

interface FooterLinkProps {
  href: string;
  title: string;
  description?: string;
  customIconUrl?: URL;
  className?: string;
  faIconUrl?: FaPresetIconsTypes;
}

interface HeaderLinkProps {
  href: string;
  title: string;
  description?: string;
  customIconUrl?: URL;
  faIconUrl?: FaPresetIconsTypes;
  animationDelay?: number;
  dropdownLinks?: HeaderLinkProps[];
}

interface SocialMediaLinkProps {
  href: string;
  title: string;
  customIconUrl?: URL;
  faIconUrl?: FaPresetIconsTypes;
}

type SchemaMessagesHelper<T> = {
  [K in keyof T]?: string | string[];
};
