"use client"; // Marks this as a client-side component in Next.js

import { cn } from "@/utils/classNames";
import { useEffect, useRef } from "react"; // Import necessary React hooks

// Define the structure of a particle object
interface Particle {
  x: number; // X position on canvas
  y: number; // Y position on canvas
  size: number; // Size of the particle
  speedX: number; // Horizontal speed
  speedY: number; // Vertical speed
  opacity: number; // Transparency level
}

export default function Particles({ className }: { className?: string }) {
  // Create a reference to the canvas element that persists between renders
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect hook runs after component mounts
  useEffect(() => {
    // Get the canvas element from the ref
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas isn't available

    // Get the 2D rendering context for drawing
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Exit if context isn't available

    // Function to make canvas fullscreen and responsive
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas(); // Initial resize
    window.addEventListener("resize", resizeCanvas); // Listen for window resize

    // Create array to store particles
    const particles: Particle[] = [];
    const particleCount = 50; // Number of particles to create

    // Initialize particles with random properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width, // Random X position
        y: Math.random() * canvas.height, // Random Y position
        size: Math.random() * 2 + 1, // Random size between 1-3
        speedX: (Math.random() - 0.5) * 0.5, // Random X speed (-0.25 to 0.25)
        speedY: (Math.random() - 0.5) * 0.5, // Random Y speed (-0.25 to 0.25)
        opacity: Math.random(), // Random initial opacity
      });
    }

    // Animation loop function
    function animate() {
      if (!ctx || !canvas) return;

      // Clear the entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      particles.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity -= 0.005; // Gradually decrease opacity

        // Reset particle when it becomes invisible
        if (particle.opacity <= 0) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: 1, // Start fully visible
          };
        }

        // Draw the particle
        ctx.beginPath(); // Start drawing
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); // Draw circle
        ctx.fillStyle = `rgba(100, 100, 100, ${particle.opacity})`; // Set color and opacity
        ctx.fill(); // Fill the circle
      });

      // Schedule the next frame
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Cleanup function runs when component unmounts
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Render the canvas element
  return (
    <canvas
      ref={canvasRef} // Attach the ref
      className={cn("absolute inset-0 pointer-events-none", className)} // Position fixed, ignore mouse events
      // style={{ zIndex: -1 }} // Place behind other content
    />
  );
}
