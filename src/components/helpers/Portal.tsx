"use client";
import useMount from "@/hooks/useMount";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
interface PortalProps extends React.ComponentPropsWithoutRef<"div"> {
  readonly children: React.ReactNode;
}
const Portal = React.forwardRef<HTMLDivElement, PortalProps>(({ children }) => {
  const { isMounted } = useMount();

  if (isMounted) {
    return createPortal(
      <AnimatePresence>{children}</AnimatePresence>,
      document.body
    );
  }

  return null;
});

Portal.displayName = "Portal";

export default Portal;
