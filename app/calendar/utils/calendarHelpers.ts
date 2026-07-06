import { COMMUNITY_ROOMS } from "@/types/calendar";

// Room color configuration — single source of truth
export const ROOM_COLORS = {
  [COMMUNITY_ROOMS.GROUND_FLOOR]: { bg: "#22c55e", border: "#16a34a" }, // green
  [COMMUNITY_ROOMS.ROOFTOP]: { bg: "#3b82f6", border: "#2563eb" }, // blue
} as const;

const DEFAULT_COLORS = { bg: "#6b7280", border: "#4b5563" }; // gray

export function getRoomColors(location?: string) {
  if (!location) return DEFAULT_COLORS;
  return ROOM_COLORS[location as keyof typeof ROOM_COLORS] ?? DEFAULT_COLORS;
}

// Convert a Date to a local floating datetime string (no timezone suffix).
// FullCalendar rrule plugin needs floating local time so events display at the correct local time.
export function toLocalFloatingDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

// Parse a stored exdate string (UTC ISO / compact iCal) to a local floating
// datetime string ("YYYY-MM-DDTHH:mm:ss", no timezone suffix) that FullCalendar's
// exdate event property can consume. Returns null if the value cannot be parsed.
export function parseExDateToLocalFloating(d: string): string | null {
  const trimmed = d.trim();
  if (!trimmed) return null;

  // Handle compact iCal: "20260416T100000Z" or "20260416T100000"
  const icalCompact = trimmed.match(/^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})(Z?)$/);
  if (icalCompact) {
    const [, yr, mo, dy, hr, mn, sc, tz] = icalCompact;
    const date = new Date(`${yr}-${mo}-${dy}T${hr}:${mn}:${sc}${tz || ""}`);
    if (isNaN(date.getTime())) return null;
    return toLocalFloatingDateString(date);
  }

  // Truncate Python microseconds (6 digits) to JS milliseconds (3 digits)
  const normalized = trimmed.replace(/(\.\d{3})\d+/, "$1");
  const date = new Date(normalized);
  if (isNaN(date.getTime())) return null;
  return toLocalFloatingDateString(date);
}

// Parse RRULE string into an object for FullCalendar
export function parseRRuleString(rruleStr: string): Record<string, string | number | string[]> {
  const result: Record<string, string | number | string[]> = {};

  const parts = rruleStr.split(";");

  for (const part of parts) {
    const [key, value] = part.split("=");
    if (!key || !value) continue;

    const lowerKey = key.toLowerCase();

    if (lowerKey === "freq") {
      result.freq = value.toLowerCase();
    } else if (lowerKey === "interval") {
      result.interval = parseInt(value, 10);
    } else if (lowerKey === "count") {
      result.count = parseInt(value, 10);
    } else if (lowerKey === "until") {
      // Convert UNTIL to local floating time to match floating dtstart
      const isoMatch = value.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.[0-9]+)?Z$/);
      const icalZMatch = value.match(/^([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})Z$/);
      if (isoMatch) {
        result.until = toLocalFloatingDateString(new Date(value));
      } else if (icalZMatch) {
        const [, year, month, day, hour, min, sec] = icalZMatch;
        result.until = toLocalFloatingDateString(new Date(`${year}-${month}-${day}T${hour}:${min}:${sec}Z`));
      } else {
        result.until = value;
      }
    } else if (lowerKey === "byday") {
      result.byweekday = value.split(",").map((day) => day.toLowerCase());
    } else {
      result[lowerKey] = value;
    }
  }

  return result;
}
