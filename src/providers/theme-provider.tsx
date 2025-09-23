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
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
