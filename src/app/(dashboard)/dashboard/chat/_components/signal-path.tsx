"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = { state: "checking" | "online" | "offline" };

const nodes = [
  { x: 24, label: "You" },
  { x: 160, label: "olivermorla.com" },
  { x: 296, label: "Mac Studio" },
];

/**
 * The route a message takes, drawn as it really is: the browser, this site,
 * then Oliver's Mac. Online, a light runs along the wire; offline, the last
 * hop goes dashed. It doubles as the server status on an empty chat.
 */
export default function SignalPath({ state }: Props) {
  const reduceMotion = useReducedMotion();
  const online = state === "online";
  const offline = state === "offline";

  return (
    <svg
      viewBox="0 0 320 64"
      className="w-full max-w-[20rem] overflow-visible"
      role="img"
      aria-label={
        online
          ? "Connected to Oliver's Mac Studio"
          : offline
            ? "Oliver's Mac Studio is offline"
            : "Checking the connection"
      }
    >
      <defs>
        <linearGradient id="signal-pulse" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-series-1)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--color-series-1)" />
          <stop offset="1" stopColor="var(--color-series-1)" stopOpacity="0" />
        </linearGradient>
        <clipPath id="signal-wire">
          <rect x="24" y="17" width="272" height="6" />
        </clipPath>
      </defs>

      {/* First hop is always up: the page loaded. */}
      <line
        x1="24"
        x2="160"
        y1="20"
        y2="20"
        stroke="var(--color-line)"
        strokeWidth="2"
      />
      <line
        x1="160"
        x2="296"
        y1="20"
        y2="20"
        stroke="var(--color-line)"
        strokeWidth="2"
        strokeDasharray={offline ? "3 5" : undefined}
      />

      {online && !reduceMotion && (
        <g clipPath="url(#signal-wire)">
          <motion.rect
            y="18"
            width="72"
            height="4"
            rx="2"
            fill="url(#signal-pulse)"
            initial={{ x: -72 }}
            animate={{ x: 296 }}
            transition={{
              duration: 2.2,
              ease: [0.77, 0, 0.175, 1],
              repeat: Infinity,
              repeatDelay: 0.8,
            }}
          />
        </g>
      )}

      {nodes.map((node, i) => {
        const lit = i < 2 || online;
        return (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy="20"
              r="6"
              fill="var(--color-page)"
              stroke={lit ? "var(--color-ink)" : "var(--color-line)"}
              strokeWidth="2"
              className="transition-[stroke] duration-300"
            />
            {i === 2 && (
              <circle
                cx={node.x}
                cy="20"
                r="2.5"
                fill={
                  online
                    ? "var(--color-up)"
                    : offline
                      ? "var(--color-down)"
                      : "var(--color-muted)"
                }
                className="transition-[fill] duration-300"
              />
            )}
            <text
              x={node.x}
              y="50"
              textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
              dx={i === 0 ? -6 : i === 2 ? 6 : 0}
              className="fill-muted text-[11px] font-medium"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
