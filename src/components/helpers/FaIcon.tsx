import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

interface FaIconProps extends Omit<FontAwesomeIconProps, "icon"> {
  readonly faIcon: IconDefinition;
}

/**
 * This component is used to display font awesome icons.
 * It is a wrapper around the FontAwesomeIcon component.
 */
const FaIcon = React.forwardRef<any, FaIconProps>(
  ({ faIcon, ...props }, ref) => {
    return <FontAwesomeIcon ref={ref} icon={faIcon} {...props} />;
  }
);

FaIcon.displayName = "FaIcon";

export default FaIcon;
