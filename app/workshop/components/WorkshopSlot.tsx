// components/workshop/WorkshopSlot.tsx
"use client";

import type { WorkshopSlot } from "@/types/workshop";

interface WorkshopSlotProps {
  slot: WorkshopSlot;
  onBook: (slotId: string) => void;
  onCancel: (slotId: string) => void;
  isBooking: boolean;
  isCancelling: boolean;
}

export default function WorkshopSlotComponent({ slot, onBook, onCancel, isBooking, isCancelling }: WorkshopSlotProps) {
  return (
    <div
      className={`rounded-lg border-2 p-4 ${
        slot.isBooked
          ? "border-red-200 bg-red-50"
          : slot.isAvailable
            ? "cursor-pointer border-green-200 bg-green-50 hover:border-green-300"
            : "border-gray-200 bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{slot.time}</p>
          {slot.isBooked && slot.bookedByCurrentUser && <p className="mt-1 text-sm text-green-600">Deins!</p>}
          {slot.isBooked && !slot.bookedByCurrentUser && <p className="mt-1 text-sm text-red-600">Bereits belegt</p>}
          {!slot.isBooked && <p className="mt-1 text-sm text-green-600">Verfügbar</p>}
        </div>

        {slot.isBooked && slot.bookedByCurrentUser ? (
          <button
            onClick={() => onCancel(slot.id)}
            disabled={isCancelling}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCancelling ? (
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                Storniere...
              </div>
            ) : (
              "Stornieren"
            )}
          </button>
        ) : !slot.isBooked ? (
          <button
            onClick={() => onBook(slot.id)}
            disabled={isBooking}
            className="rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isBooking ? (
              <div className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                Buchung...
              </div>
            ) : (
              "Buchen"
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
