/** Date and time helpers. Everything derives from the ISO dates in data/. */

const TIME_FORMAT = /^(\d{1,2}):(\d{2})$/;

/** "18:45" → "6:45 PM" */
export function formatTime(value: string): string {
  const match = TIME_FORMAT.exec(value);
  if (!match) return value;
  const hours = Number(match[1]);
  const minutes = match[2];
  const suffix = hours >= 12 ? "PM" : "AM";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${minutes} ${suffix}`;
}

/** "18:45" → 1125 */
export function toMinutes(value: string): number {
  const match = TIME_FORMAT.exec(value);
  if (!match) return 0;
  return Number(match[1]) * 60 + Number(match[2]);
}

/** Handles events that run past midnight (e.g. 22:45 → 00:15). */
export function durationBetween(start: string, end: string): number {
  const from = toMinutes(start);
  const to = toMinutes(end);
  return to >= from ? to - from : to + 24 * 60 - from;
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return "";
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return hours === 1 ? "1 hour" : `${hours} hours`;
  return `${hours} hr ${rest} min`;
}

function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));
}

/** "2026-11-25" → "Wednesday" */
export function weekdayName(iso: string, style: "long" | "short" = "long"): string {
  return new Intl.DateTimeFormat("en-GB", { weekday: style, timeZone: "UTC" }).format(
    parseISODate(iso),
  );
}

/** "2026-11-25" → "25 November 2026" */
export function longDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseISODate(iso));
}

/** "2026-11-25" → "Wed 25 Nov" */
export function shortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(parseISODate(iso));
}

/** 25 → "25th" */
export function ordinal(value: number): string {
  const rest = value % 100;
  if (rest >= 11 && rest <= 13) return `${value}th`;
  switch (value % 10) {
    case 1:
      return `${value}st`;
    case 2:
      return `${value}nd`;
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
}
