/** Converts a Date to an iCalendar UTC datetime string (e.g. "20260416T120000Z"). */
export function toICalDateString(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  const sec = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hour}${min}${sec}Z`;
}

/**
 * Normalize an RRULE string for parsing with rrule.js.
 *
 * Handles two issues:
 * 1. Backend stores UNTIL as ISO 8601 (2026-04-20T17:00:00.000Z) but rrule.js
 *    expects compact iCalendar format (20260420T170000Z).
 * 2. rrule.js requires a DTSTART line if not embedded in the RRULE string.
 */
export function normalizeRRuleForParsing(rruleStr: string, dtstart: Date): string {
  let s = rruleStr.trim();

  // Fix UNTIL format: ISO 8601 → compact iCalendar
  s = s.replace(
    /UNTIL=([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.[0-9]+)?Z/g,
    (_, year, month, day, hour, min, sec) => `UNTIL=${year}${month}${day}T${hour}${min}${sec}Z`,
  );

  // Add DTSTART + RRULE prefix if missing
  if (!s.includes("DTSTART") && !s.startsWith("RRULE:")) {
    return `DTSTART:${toICalDateString(dtstart)}\nRRULE:${s}`;
  }
  if (s.startsWith("RRULE:") && !s.includes("DTSTART")) {
    return `DTSTART:${toICalDateString(dtstart)}\n${s}`;
  }

  return s;
}
