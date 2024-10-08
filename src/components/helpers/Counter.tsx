"use client";
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  duration: number;
  targetCount: number;
}

export function Counter({ duration, targetCount }: CounterProps) {
  // State to keep track of the current count value
  const [count, setCount] = useState(0);
  // Ref to store the ID of the requested animation frame
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Variable to store the timestamp when the animation starts
    let startTimestamp: number | null = null;

    // The step function will be called on each animation frame
    const step = (timestamp: number) => {
      // Set the start timestamp on the first call
      if (!startTimestamp) startTimestamp = timestamp;
      // Calculate how much time has passed since the animation started
      const progress = timestamp - startTimestamp;

      // Calculate the current count based on progress and ensure it doesn't exceed targetCount
      const currentCount = Math.min(
        // Scale the progress to the targetCount over the duration
        Math.floor((progress / duration) * targetCount),
        targetCount
      );

      // Update the state with the new count value
      setCount(currentCount);

      // If the animation hasn't reached the full duration, request the next frame
      if (progress < duration) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        // Ensure the final count is set to targetCount
        setCount(targetCount);
      }
    };

    // Start the animation by requesting the first animation frame
    frameRef.current = requestAnimationFrame(step);

    // Cleanup function to cancel the animation frame when the component unmounts or updates
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, targetCount]); // Re-run the effect if duration or targetCount changes

  // Render the current count value inside a div
  return <div>{count}</div>;
}
