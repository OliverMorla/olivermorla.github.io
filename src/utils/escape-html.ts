const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const HTML_ESCAPE_PATTERN = /[&<>"']/g;

/** Escapes user input before it is interpolated into HTML (e.g. emails). */
export const escapeHtml = (value: string) =>
  value.replace(HTML_ESCAPE_PATTERN, (char) => HTML_ESCAPES[char]);
