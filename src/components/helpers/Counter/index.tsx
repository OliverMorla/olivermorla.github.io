import { useState, useEffect, useRef } from "react";

export function Counter({ duration, targetCount }: CounterProps) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    let startTimestamp: number;
    let currentCount = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      currentCount = Math.floor(progress / duration);

      if (currentCount <= targetCount) {
        currentCount = Math.min(currentCount, targetCount);
        setCount(currentCount);
        frameRef.current = requestAnimationFrame(step) as any;
      }
    };
    frameRef.current = requestAnimationFrame(step) as any;

    return () => cancelAnimationFrame(frameRef.current as any);
  }, [duration, targetCount]);

  return <div>{count}</div>;
}
