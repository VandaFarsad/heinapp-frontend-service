// components/workshop/WorkshopSlotsGrid.tsx
"use client";

import type { WorkshopSlot } from "@/types/workshop";
import WorkshopSlotComponent from "./WorkshopSlot";

interface WorkshopSlotsGridProps {
  slotsByDate: Record<string, WorkshopSlot[]>;
  onBookSlot: (slotId: string) => void;
  onCancelBooking: (slotId: string) => void;
  bookingSlot: string | null;
  cancellingSlot: string | null;
  formatDate: (dateString: string) => string;
}

export default function WorkshopSlotsGrid({
  slotsByDate,
  onBookSlot,
  onCancelBooking,
  bookingSlot,
  cancellingSlot,
  formatDate,
}: WorkshopSlotsGridProps) {
  return (
    <div className="space-y-8">
      {Object.entries(slotsByDate).map(([date, dateSlots]) => (
        <div key={date} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-green-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">{formatDate(date)}</h3>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {dateSlots.map((slot) => (
                <WorkshopSlotComponent
                  key={slot.id}
                  slot={slot}
                  onBook={onBookSlot}
                  onCancel={onCancelBooking}
                  isBooking={bookingSlot === slot.id}
                  isCancelling={cancellingSlot === slot.id}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
