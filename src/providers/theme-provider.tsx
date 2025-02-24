"use client"; // Mark this as a client-side component for Next.js

import useEffectMount from "@/hooks/useEffectMount";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the possible theme values
export type Theme = "light" | "dark";

// Define the shape of our theme context
export type ThemeContextProps = {
  // Current theme preference (can be system-based)
  theme: Theme | "system";
  // Function to update the theme preference
  setTheme: Dispatch<SetStateAction<Theme | "system">>;
  // The actual theme being applied (resolved from system preference if needed)
  resolvedTheme: Theme;
};

// Create the context with undefined as initial value
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Main ThemeProvider component that manages theme state and preferences
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // The user's theme preference: can be 'light', 'dark', or 'system'
  // 'system' means it will follow the operating system's theme preference
  const [theme, setTheme] = useState<Theme | "system">("system");

  // The actual theme being applied, resolved from system preference if needed
  // This is always either 'light' or 'dark', never 'system'
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");

  // Controls whether the provider has mounted and hydrated with client-side data
  // This prevents hydration mismatch between server and client
  const isMounted = useEffectMount();

  // Effect to handle system theme changes
  useEffect(() => {
    // Create a media query to detect system dark mode preference
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    // Handler function to update theme based on system preference
    const handleChange = () => {
      if (theme === "system") {
        setResolvedTheme(media.matches ? "dark" : "light"); // media.matches is true for dark mode
      }
    };

    // Check the initial system preference
    handleChange();

    // Listen for system theme changes
    media.addEventListener("change", handleChange);

    // Cleanup listener on component unmount to prevent memory leaks
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  // Effect to handle initial mount and load saved preferences
  useEffect(() => {
    // Check if user has a saved theme preference in localStorage
    const storedTheme = localStorage.getItem("theme") as
      | Theme
      | "system"
      | null;

    // If a preference was found, apply it
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Mark the provider as mounted once we've hydrated with client data
    // This prevents flash of wrong theme during SSR
    // setMounted(true);
  }, []);

  // Effect to apply theme changes to the document
  useEffect(() => {
    const root = document.documentElement;
    // If theme is 'system', use the resolved theme, otherwise use the explicit theme
    const effectiveTheme = theme === "system" ? resolvedTheme : theme;

    // Update the document classes and color scheme
    // The 'dark' class is used by Tailwind's dark mode
    // The color-scheme property helps with native elements like scrollbars
    if (effectiveTheme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    // Save the user's preference to localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme, resolvedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        // For consumers, resolve the theme if set to system
        // This ensures consumers always get either 'light' or 'dark'
        resolvedTheme: theme === "system" ? resolvedTheme : (theme as Theme),
      }}
    >
      {/* Only render children after initial hydration to prevent flash of wrong theme */}
      {isMounted && children}
    </ThemeContext.Provider>
  );
};
