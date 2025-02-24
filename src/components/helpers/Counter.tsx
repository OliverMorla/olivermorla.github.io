"use client";
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  duration: number;
  targetCount: number;
}

export function Counter({ duration, targetCount }: CounterProps) {
  // State to keep track of the current count value
  const [count, setCount] = useState(0);
  // Ref to store the start time of the animation
  const startTimeRef = useRef<number>(0);
  // Ref to store the ID of the requested animation frame
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Set the start time of the animation
    startTimeRef.current = performance.now();

    const animate = () => {
      // Calculate the elapsed time since the animation started
      const elapsed = performance.now() - startTimeRef.current;
      // Calculate the progress of the animation as a fraction of the total duration
      const progress = Math.min(elapsed / duration, 1);

      // Calculate the current count based on the progress and ensure it doesn't exceed targetCount
      const currentCount = Math.floor(targetCount * progress);
      setCount(currentCount);

      // If the animation hasn't reached the end, request the next frame
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start the animation by requesting the first animation frame
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup function to cancel the animation frame when the component unmounts or updates
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, targetCount]); // Re-run the effect if duration or targetCount changes

  // Render the current count value inside a div
  return <div>{count}</div>;
}
