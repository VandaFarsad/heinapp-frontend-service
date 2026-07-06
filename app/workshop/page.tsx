"use client";

import { useSession } from "next-auth/react";
import AuthGuard from "../components/AuthGuard";
import ScrollToTopButton from "../components/ScrollToTopButton";
import AlertMessage from "../components/ui/AlertMessage";
import { LoadingSpinner, UserBookings, WorkshopHeader, WorkshopInfo, WorkshopSlotsGrid } from "./components";
import { useWorkshopSlots } from "./hooks/useWorkshopSlots";
import { formatDate, groupSlotsByDate } from "./utils/workshopUtils";

export default function WorkshopPage() {
  const { status } = useSession();
  const { slots, loading, bookingSlot, cancellingSlot, error, success, handleBookSlot, handleCancelBooking } =
    useWorkshopSlots();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated") {
    return (
      <AuthGuard
        status={status}
        messages={{
          unauthenticated: "Sie müssen angemeldet sein, um Werkstatt-Slots zu buchen.",
        }}
      >
        {null}
      </AuthGuard>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const slotsByDate = groupSlotsByDate(slots);
  const userBookings = slots.filter((slot) => slot.bookedByCurrentUser);

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <WorkshopHeader />

        {error && <AlertMessage type="error" message={error} />}
        {success && <AlertMessage type="success" message={success} />}

        <UserBookings
          bookings={userBookings}
          onCancel={handleCancelBooking}
          cancellingSlot={cancellingSlot}
          formatDate={formatDate}
        />

        <WorkshopInfo />

        <WorkshopSlotsGrid
          slotsByDate={slotsByDate}
          onBookSlot={handleBookSlot}
          onCancelBooking={handleCancelBooking}
          bookingSlot={bookingSlot}
          cancellingSlot={cancellingSlot}
          formatDate={formatDate}
        />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
