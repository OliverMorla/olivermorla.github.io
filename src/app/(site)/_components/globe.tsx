"use client";

import createGlobe, { type Globe as CobeGlobe } from "cobe";
import { useEffect, useRef } from "react";

const NEW_YORK: [number, number] = [40.7128, -74.006];

type Props = {
  // Rotation in radians. About 6.0 faces New York; lower turns it left.
  phi?: number;
  // Tilt toward the viewer, in radians.
  theta?: number;
  // "spin" turns continuously; "drift" sways a little either side of `phi`,
  // so whatever is pinned to New York stays in view.
  motion?: "spin" | "drift";
  // Pinned to the New York marker and moved with it every frame.
  children?: React.ReactNode;
};

const SPIN_SPEED = 0.0021; // radians per frame, about 50s a turn
const DRIFT_RANGE = 0.22; // radians either side of phi
const DRIFT_PERIOD = 52_000; // ms for one full sway

/**
 * A dotted WebGL globe with New York marked. It only draws while on screen,
 * holds still for reduced motion, and fades in once the first frame is up.
 * Fills its positioned parent.
 */
export default function Globe({
  phi = 4.1,
  theta = 0.32,
  motion = "spin",
  children,
}: Props) {
  // cobe wraps its canvas in a div of its own, so the canvas lives in a host
  // React never reconciles, and is torn down by hand.
  const hostRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText =
      "width:100%;height:100%;opacity:0;transition:opacity 1.2s ease;contain:layout paint size";
    host.append(canvas);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const born = performance.now();
    let globe: CobeGlobe | null = null;
    let frame = 0;
    let angle = phi;
    let size = host.offsetWidth * dpr;
    let anchor: HTMLElement | undefined;

    // cobe keeps a 1px element at each marker's projected position (meant
    // for CSS anchor positioning); copying its offsets works everywhere.
    const pin = () => {
      const target = pinRef.current;
      if (!target) return;
      anchor ??= Array.from(host.querySelectorAll<HTMLElement>("div")).find(
        (el) => el.style.width === "1px",
      );
      if (!anchor) return;
      target.style.left = anchor.style.left;
      target.style.top = anchor.style.top;
      target.style.opacity = "1";
    };

    const draw = () => {
      globe?.update({ phi: angle, width: size, height: size });
      pin();
    };

    const loop = (now: number) => {
      angle =
        motion === "spin"
          ? angle + SPIN_SPEED
          : phi +
            DRIFT_RANGE * Math.sin(((now - born) / DRIFT_PERIOD) * Math.PI * 2);
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!globe) {
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: size,
          height: size,
          phi: angle,
          theta,
          dark: 1,
          diffuse: 1.1,
          mapSamples: 22000,
          mapBrightness: 4.2,
          mapBaseBrightness: 0.02,
          baseColor: [0.2, 0.29, 0.5],
          markerColor: [0.79, 0.85, 1],
          glowColor: [0.12, 0.2, 0.42],
          markers: [{ location: NEW_YORK, size: 0.028, id: "nyc" }],
          markerElevation: 0,
        });
        draw();
        canvas.style.opacity = "1";
      }
      if (!still && !frame) frame = requestAnimationFrame(loop);
    };

    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const visibility = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : pause()),
      { rootMargin: "120px" },
    );
    visibility.observe(host);

    const resize = new ResizeObserver(() => {
      size = host.offsetWidth * dpr;
      draw();
    });
    resize.observe(host);

    return () => {
      visibility.disconnect();
      resize.disconnect();
      pause();
      globe?.destroy();
      host.replaceChildren();
    };
  }, [phi, theta, motion]);

  return (
    <>
      <div ref={hostRef} aria-hidden="true" className="absolute inset-0" />
      {children && (
        <div
          ref={pinRef}
          className="absolute size-0"
          style={{ opacity: 0, transition: "opacity 0.6s ease" }}
        >
          {children}
        </div>
      )}
    </>
  );
}
