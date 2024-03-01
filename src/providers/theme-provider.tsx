"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: "",
  setTheme: () => {},
});

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    console.log("=> Failed to read ThemeContext");
  }

  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const contextValue: ThemeContextProps = useMemo(
    () => ({
      currentTheme: theme,
      setTheme,
    }),
    [theme]
  );
  

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
