"use client";

import useEffectMount from "@/hooks/useEffectMount";
import { createPortal } from "react-dom";

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
