// utils/workshopUtils.ts

import type { WorkshopSlot } from "@/types/workshop";

export const groupSlotsByDate = (slots: WorkshopSlot[]): Record<string, WorkshopSlot[]> => {
  return slots.reduce(
    (acc, slot) => {
      if (!acc[slot.date]) {
        acc[slot.date] = [];
      }
      acc[slot.date].push(slot);
      return acc;
    },
    {} as Record<string, WorkshopSlot[]>,
  );
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
