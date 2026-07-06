// components/workshop/UserBookings.tsx
"use client";

import type { WorkshopSlot } from "@/types/workshop";

interface UserBookingsProps {
  bookings: WorkshopSlot[];
  onCancel: (slotId: string) => void;
  cancellingSlot: string | null;
  formatDate: (dateString: string) => string;
}

export default function UserBookings({ bookings, onCancel, cancellingSlot, formatDate }: UserBookingsProps) {
  if (bookings.length === 0) return null;

  return (
    <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-blue-900">Deine aktuellen Buchungen</h2>
      <div className="space-y-2">
        {bookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between rounded-lg bg-white p-4">
            <div>
              <p className="font-medium text-gray-900">
                {formatDate(booking.date)} - {booking.time}
              </p>
            </div>
            <button
              onClick={() => onCancel(booking.id)}
              disabled={cancellingSlot === booking.id}
              className="text-sm text-red-600 transition-colors hover:text-red-700"
            >
              {cancellingSlot === booking.id ? "Storniere..." : "Stornieren"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
