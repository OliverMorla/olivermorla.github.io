"use client";

import { createPortal } from "react-dom";
import useEffectMount from "@/hooks/useEffectMount";

// Portal component is used to render a component in a different DOM node
const Portal = ({
  children,
  portalRoot,
}: Readonly<{ children: React.ReactNode; portalRoot?: HTMLElement }>) => {
  const isMounted = useEffectMount();

  if (!isMounted) return null;

  const root = portalRoot ?? document.body;

  return createPortal(children, root);
};

export default Portal;
