"use client";

import { useEffect, useId, useState, type RefObject } from "react";

type Lens = { href: string; width: number; height: number };

type UADataNavigator = Navigator & {
  userAgentData?: { brands: { brand: string }[] };
};

/**
 * A displacement map for a rounded rectangle: neutral in the middle, and
 * within `bezel` px of the edge it pulls the backdrop inward along the edge
 * normal, strongest at the rim. That bend is what makes iOS 26 glass read
 * as a thick lens rather than a flat frosted sheet.
 */
function lensMap(width: number, height: number, radius: number, bezel: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const image = ctx.createImageData(width, height);
  const cx = width / 2;
  const cy = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      // Signed distance to the rounded rectangle, and its outward normal.
      const qx = Math.abs(dx) - (cx - radius);
      const qy = Math.abs(dy) - (cy - radius);
      let edge: number;
      let nx = 0;
      let ny = 0;
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy);
        edge = radius - len;
        nx = qx / len;
        ny = qy / len;
      } else if (qx > qy) {
        edge = radius - qx;
        nx = 1;
      } else {
        edge = radius - qy;
        ny = 1;
      }
      nx *= Math.sign(dx) || 1;
      ny *= Math.sign(dy) || 1;

      const t = Math.max(0, 1 - edge / bezel);
      const pull = t * t;
      const i = (y * width + x) * 4;
      image.data[i] = 128 - nx * pull * 127;
      image.data[i + 1] = 128 - ny * pull * 127;
      image.data[i + 2] = 128;
      image.data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
}

/**
 * Adds edge refraction to a `.glass` element. Only Chromium renders SVG
 * filters inside backdrop-filter, so elsewhere (and with reduced
 * transparency) this does nothing and the CSS-only glass stands alone.
 * Spread `lensProps` on the element and render `lensFilter` next to it.
 */
export function useLiquidLens(
  ref: RefObject<HTMLElement | null>,
  { bezel = 14, scale = 30 }: { bezel?: number; scale?: number } = {},
) {
  const id = `lens-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [lens, setLens] = useState<Lens | null>(null);

  useEffect(() => {
    const el = ref.current;
    const chromium = (navigator as UADataNavigator).userAgentData?.brands.some(
      (b) => b.brand === "Chromium",
    );
    const solid = window.matchMedia(
      "(prefers-reduced-transparency: reduce)",
    ).matches;
    if (!el || !chromium || solid) return;

    let drawn = "";
    const draw = () => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      const key = `${width}x${height}`;
      if (!width || !height || key === drawn) return;
      drawn = key;
      const radius = Math.min(
        parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0,
        width / 2,
        height / 2,
      );
      setLens({ href: lensMap(width, height, radius, bezel), width, height });
    };

    const resize = new ResizeObserver(draw);
    resize.observe(el);
    return () => resize.disconnect();
  }, [ref, bezel]);

  const lensProps = {
    "data-lens": lens ? "" : undefined,
    style: lens
      ? ({ "--lens": `url(#${id})` } as React.CSSProperties)
      : undefined,
  };

  const lensFilter = lens ? (
    <svg aria-hidden="true" className="pointer-events-none absolute size-0">
      <filter id={id} colorInterpolationFilters="sRGB">
        <feImage
          href={lens.href}
          x="0"
          y="0"
          width={lens.width}
          height={lens.height}
          preserveAspectRatio="none"
          result="map"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  ) : null;

  return { lensProps, lensFilter };
}
