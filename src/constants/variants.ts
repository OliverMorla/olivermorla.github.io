import { cn } from "@/utils/classNames";

// Small disabled classes for better UX and accessibility
export const smDisabledClasses = `
  disabled:cursor-not-allowed 
  disabled:select-none 
  disabled:pointer-events-none 
  disabled:opacity-50
  disabled:[aria-disabled="true"]
  disabled:[aria-readonly="true"]
  disabled:[tabindex="-1"]
`;

// Enhanced disabled classes for better UX and accessibility
export const enhancedDisabledClasses = `
  disabled:cursor-not-allowed 
  disabled:select-none 
  disabled:pointer-events-none 
  disabled:opacity-50
  disabled:bg-gray-50 
  disabled:dark:bg-gray-800
  disabled:border-gray-200
  disabled:dark:border-gray-700
  disabled:text-gray-400
  disabled:dark:text-gray-500
  disabled:shadow-none
  disabled:hover:shadow-none
  disabled:focus:ring-0
  disabled:focus:outline-none
  disabled:active:transform-none
  disabled:active:scale-100
  disabled:transition-none
  disabled:placeholder-gray-400
  disabled:dark:placeholder-gray-500
  disabled:[aria-disabled="true"]
  disabled:[aria-readonly="true"]
  disabled:[tabindex="-1"]
`;

// Enhanced appearance classes for better UX and accessibility
export const enhancedAppearanceClasses =
  "transition appearance-none focus:ring-1 active:focus:ring-2 focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-transparent rounded-md border border-neutral-300/75 dark:border-neutral-700/75 focus:ring-blue-400/75 dark:focus:ring-blue-600/75";

export const enhancedClasses = cn(enhancedAppearanceClasses, smDisabledClasses);

export const defaultInputClassName = cn(enhancedClasses);

export const defaultInputClassNameWithIcon = cn(
  enhancedClasses,
  "relative py-2 pl-8 pr-2 flex-grow w-full"
);

export const defaultButtonClassName = cn(
  smDisabledClasses,
  enhancedAppearanceClasses,
  "cursor-pointer flex items-center justify-center gap-2 text-nowrap leading-relaxed" // Just in case if we need to add icons
);

export const buttonVariants = {
  solidLight:
    "text-neutral-900 dark:text-neutral-100 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-900 dark:active:bg-neutral-950 rounded-md",
  solidDark:
    "text-neutral-100 dark:text-neutral-900 px-4 py-2 bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-950 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:active:bg-neutral-300 rounded-md",
  outline:
    "bg-transparent px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-900 rounded-md",
  // Custom variants
  solid:
    "text-white px-4 py-2 bg-gradient-to-r from-neutral-500 to-red-500 hover:from-neutral-600 hover:to-red-600 active:from-neutral-700 active:to-red-700 dark:from-neutral-700 dark:to-neutral-800 dark:hover:from-neutral-800 dark:hover:to-neutral-900 dark:active:from-neutral-900 dark:active:to-neutral-950 rounded-md",
  fixed:
    "text-neutral-200 px-4 py-2 bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 active:from-amber-700 active:to-pink-700 rounded-md",
};

export type ButtonVariantsProps = keyof typeof buttonVariants;

export const buttonVariant = ({ v }: { v: ButtonVariantsProps }) => {
  return cn(defaultButtonClassName, buttonVariants[v]);
};

export const defaultTextAreaClassNameWithIcon = cn(
  enhancedClasses,
  "relative py-2 pl-8 pr-2 flex-grow w-full"
);

export const defaultSelectClassName = cn(enhancedClasses);

export const defaultSelectClassNameWithIcon = cn(
  enhancedClasses,
  "relative py-2 pl-8 pr-2 flex-grow w-full bg-neutral-100 dark:bg-neutral-900"
);

export const defaultTextAreaClassName = cn(enhancedClasses);

export const defaultIconButtonClassName = cn(
  smDisabledClasses,
  "w-8 h-8 cursor-pointer hover:bg-emerald-200 active:bg-emerald-400 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-900/50 rounded-md p-2 flex items-center justify-center"
);

export const defaultLinkClassName = cn(
  smDisabledClasses,
  "cursor-pointer hover:bg-neutral-200/75 active:bg-neutral-400/75 dark:hover:bg-neutral-700 dark:active:bg-neutral-900 rounded-md p-2 flex items-center justify-center w-fit transition"
);

export const defaultLinkClassNameWithIcon = cn(
  enhancedClasses,
  "flex items-center gap-2 cursor-pointer hover:bg-neutral-200/75 active:bg-neutral-400/75 dark:hover:bg-neutral-700 dark:active:bg-neutral-900 rounded-md p-2 flex items-center justify-center w-fit"
);
