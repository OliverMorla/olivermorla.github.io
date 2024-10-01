import React from "react";
import { faPresetIcons } from "../../constants";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { FaPresetIconsTypes } from "../../constants";

interface IconProps extends Omit<FontAwesomeIconProps, "icon"> {
  readonly faIcon: FaPresetIconsTypes;
}

/**
 * This component is used to display font awesome icons.
 * It is a wrapper around the FontAwesomeIcon component.
 */
const Icon = React.forwardRef<any, IconProps>(
  ({ faIcon, ...props }, ref) => {
    return (
      <FontAwesomeIcon ref={ref} icon={faPresetIcons[faIcon]} {...props} />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
