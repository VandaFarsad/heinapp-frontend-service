// types/calendar.ts
// Shared TypeScript types for Calendar feature

// Community Room constants - synced with backend calendar_app/serializers.py
// If these values change, update the backend definition as well.
export const COMMUNITY_ROOMS = {
  GROUND_FLOOR: "Gemeinschaftsraum: Erdgeschoss",
  ROOFTOP: "Gemeinschaftsraum: Dach",
} as const;

export type CommunityRoom = (typeof COMMUNITY_ROOMS)[keyof typeof COMMUNITY_ROOMS];

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description?: string;
  location?: string;
  url?: string;
  rrule?: string;  // RFC 5545 recurrence rule
  exdate?: string;  // Exception dates (comma-separated ISO strings)
  occurrenceStart?: Date;  // Set when clicking a specific recurring occurrence
}

export interface EventForm {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  description: string;
  location: string;
  url: string;
  rrule: string;
  exdate: string;
}

export interface EventData {
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  description: string;
  location: string;
  url: string;
  rrule?: string;
  exdate?: string;
  id?: string | undefined;
}

// Room filter type
export type RoomFilter = CommunityRoom | "all" | "none";

// Helper functions
export function isCommunityRoom(location: string | undefined): boolean {
  if (!location) return false;
  return Object.values(COMMUNITY_ROOMS).includes(location as CommunityRoom);
}

export function getRoomFromLocation(location: string | undefined): CommunityRoom | null {
  if (!location) return null;
  if (location === COMMUNITY_ROOMS.GROUND_FLOOR) return COMMUNITY_ROOMS.GROUND_FLOOR;
  if (location === COMMUNITY_ROOMS.ROOFTOP) return COMMUNITY_ROOMS.ROOFTOP;
  return null;
}

export function getRoomColor(location: string | undefined): string {
  const room = getRoomFromLocation(location);
  switch (room) {
    case COMMUNITY_ROOMS.GROUND_FLOOR:
      return "green"; // Green for ground floor
    case COMMUNITY_ROOMS.ROOFTOP:
      return "blue"; // Blue for rooftop
    default:
      return "default"; // Default color for other events
  }
}

export function getRoomIcon(location: string | undefined): string {
  const room = getRoomFromLocation(location);
  switch (room) {
    case COMMUNITY_ROOMS.GROUND_FLOOR:
      return "🏠";
    case COMMUNITY_ROOMS.ROOFTOP:
      return "🏢";
    default:
      return "";
  }
}
