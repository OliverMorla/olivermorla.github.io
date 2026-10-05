import { cva } from "class-variance-authority";

// Shared by <Button> and <ButtonLink> so both stay visually identical.
export const buttonVariants = cva(
  "relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition ease-in-out select-none outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-800/40",
  {
    variants: {
      variant: {
        none: "",
        gradient:
          "rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm hover:from-indigo-600 hover:to-violet-600 active:from-indigo-700 active:to-violet-700",
        solid:
          "rounded-md bg-indigo-200 text-neutral-900 shadow-sm hover:bg-indigo-300 active:bg-indigo-400",
        solidLight:
          "rounded-md bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-900",
        solidDark:
          "rounded-md bg-neutral-900 text-neutral-100 hover:bg-neutral-800 active:bg-neutral-950 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:active:bg-neutral-300",
        transparent:
          "rounded-md border border-neutral-300 bg-transparent shadow-sm hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:active:bg-neutral-900",
        danger:
          "rounded-md bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
      },
      width: {
        none: "",
        fit: "w-fit",
        full: "w-full",
        auto: "w-auto",
      },
      padding: {
        none: "",
        sm: "px-3 py-1.5",
        md: "px-4 py-2",
        lg: "px-6 py-3",
      },
      fontSize: {
        none: "",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
      },
      rounded: {
        none: "",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      fontSize: "md",
      padding: "md",
      width: "fit",
      shadow: "sm",
      rounded: "none",
      variant: "solidLight",
    },
  },
);
