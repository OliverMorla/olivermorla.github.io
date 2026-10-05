/** Four-digit year of an ISO date, or `null` when missing or invalid. */
export const formatYear = (date: string | null | undefined) => {
  if (!date) return null;
  const year = new Date(date).getUTCFullYear();
  return Number.isNaN(year) ? null : String(year);
};
