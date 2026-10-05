"use client";

import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "../_lib/content";

type ProjectIndexProps = {
  projects: Project[];
};

export default function ProjectIndex({ projects }: ProjectIndexProps) {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // The floating preview trails the cursor on a spring; on touch it's skipped.
  const x = useSpring(0, { stiffness: 350, damping: 34, mass: 0.5 });
  const y = useSpring(0, { stiffness: 350, damping: 34, mass: 0.5 });
  const follow = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const onPointerMove = (event: React.PointerEvent) => {
    if (!finePointer) return;
    if (reduceMotion || hovered === null) {
      x.jump(event.clientX);
      y.jump(event.clientY);
    } else {
      x.set(event.clientX);
      y.set(event.clientY);
    }
  };

  return (
    <div className="relative" onPointerMove={onPointerMove}>
      <ul
        className="project-list border-b border-white/10"
        onPointerLeave={() => setHovered(null)}
      >
        {projects.map((project) => {
          const content = (
            <>
              <span className="relative aspect-[16/10] w-[4.5rem] overflow-hidden rounded-md bg-band-panel md:hidden">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover object-top"
                />
              </span>
              <span className="flex min-w-0 flex-col md:contents">
                <span className="truncate text-[1.0625rem] font-[560] tracking-[-0.015em] text-canvas">
                  {project.name}
                </span>
                <span className="truncate text-[0.9375rem] text-band-muted">
                  {project.summary}
                </span>
              </span>
              <span className="hidden text-[0.875rem] text-band-muted md:block">
                {project.industry}
              </span>
              <span className="hidden justify-end text-band-muted md:flex">
                {project.domain && (
                  <ArrowUpRight className="size-4" aria-hidden />
                )}
              </span>
            </>
          );

          const rowClass =
            "grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 py-3.5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_9rem_1.25rem] md:py-5";

          return (
            <li
              key={project.slug}
              className="project-row border-t border-white/10"
              onPointerEnter={() => setHovered(project.slug)}
            >
              {project.domain ? (
                <a
                  href={`https://${project.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                  aria-label={`${project.name}, ${project.summary.toLowerCase()}. Opens ${project.domain}`}
                >
                  {content}
                </a>
              ) : (
                <div className={rowClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      {finePointer && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-40"
          style={{ transform: follow }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="relative -translate-x-1/2 -translate-y-[calc(100%+1.25rem)]"
                initial={{ opacity: 0, transform: "scale(0.94)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0.96)" }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                style={{ transformOrigin: "50% 100%" }}
              >
                <div className="relative aspect-[16/10] w-[20rem] overflow-hidden rounded-xl bg-band-panel shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_-12px_rgba(0,0,0,0.6)]">
                  {projects.map((project) => (
                    <Image
                      key={project.slug}
                      src={project.image}
                      alt=""
                      fill
                      sizes="320px"
                      className="object-cover object-top transition-opacity duration-150 ease-[ease]"
                      style={{ opacity: project.slug === hovered ? 1 : 0 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
