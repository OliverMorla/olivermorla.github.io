"use client";
import React from "react";
import useMount from "@/hooks/useMount";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";

interface PortalProps extends React.ComponentPropsWithoutRef<"div"> {
  readonly children: React.ReactNode;
}

const Portal = React.forwardRef<HTMLDivElement, PortalProps>(({ children, ...props }, ref) => {
  const { isMounted } = useMount();

  if (isMounted.current) {
    return createPortal(
      <AnimatePresence>{children}</AnimatePresence>,
      document.body
    );
  }

  return null;
});

Portal.displayName = "Portal";

export default Portal;
