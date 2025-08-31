"use client";

import {
  type ThemeProviderProps,
  ThemeProvider as NextThemeProvider,
} from "next-themes";
const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
