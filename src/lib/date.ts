export function formatDayName(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: "long" }).toUpperCase();
}

export function formatDayAndMonth(date: Date): string {
  return date.toLocaleDateString(undefined, { day: "numeric", month: "long" });
}

/** ISO 8601 week number (weeks start Monday, week 1 contains the first Thursday of the year). */
export function getIsoWeek(date: Date): number {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const firstDayNumber = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNumber + 3);
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 86400000));
}
