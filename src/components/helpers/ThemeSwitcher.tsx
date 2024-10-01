import React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ThemeSwitcher = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<"select">
>(({ className, ...props }, ref) => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <select
      ref={ref}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className={cn(
        "border-[1px] border-neutral-300 dark:border-neutral-700 rounded-md p-2",
        className
      )}
      {...props}
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
});

ThemeSwitcher.displayName = "ThemeSwitcher";

export default ThemeSwitcher;
