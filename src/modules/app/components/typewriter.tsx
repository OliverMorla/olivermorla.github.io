"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/utils";

interface TypewriterProps extends React.ComponentPropsWithRef<"span"> {
  text: string | string[];
}

const Typewriter = ({ text, style, className, ...props }: TypewriterProps) => {
  const [currentText, setCurrentText] = useState(Array.isArray(text) ? text[0] : text);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!Array.isArray(text)) return;

    const interval = setInterval(() => {
      setKey(prev => prev + 1);
      setCurrentIndex((prev) => (prev + 1) % text.length);
      setCurrentText(text[(currentIndex + 1) % text.length]);
    }, 4000);

    return () => clearInterval(interval);
  }, [text, currentIndex]);

  return (
    <div className="typewriter-wrapper">
      <span
        {...props}
        key={key}
        className={cn("typewriter", className)}
        style={{
          ...style,
          '--characters': currentText.length,
        } as React.CSSProperties}
      >
        {currentText}
      </span>
    </div>
  );
};

export default Typewriter;
