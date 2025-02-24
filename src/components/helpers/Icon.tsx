"use client";

import React from "react";

import { faPresetIcons } from "@/constants";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import type { FaPresetIconsTypes } from "@/constants";

interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  readonly faIcon: FaPresetIconsTypes;
}

// This component is used to display font awesome icons.
const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ faIcon, ...props }, ref) => {
    return (
      <FontAwesomeIcon ref={ref} icon={faPresetIcons[faIcon]} {...props} />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
