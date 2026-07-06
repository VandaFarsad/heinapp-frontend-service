"use client";

import { useSession } from "next-auth/react";
import AuthGuard from "../components/AuthGuard";
import { CalendarComponent, CalendarHeader, ErrorBanner, EventModal } from "./components";
import { useCalendarEvents } from "./hooks";

export default function Calendar() {
  const { data: session, status } = useSession();
  const {
    filteredEvents,
    error,
    isLoading,
    setError,
    showEventModal,
    selectedEvent,
    selectedDateRange,
    activeFilter,
    setActiveFilter,
    handleSaveEvent,
    handleDeleteEvent,
    handleSaveException,
    handleDeleteOccurrence,
    handleCreateEvent,
    handleEventClick,
    handleDateSelect,
    handleCloseModal,
    handleRefresh,
    handleDatesChange,
  } = useCalendarEvents();

  return (
    <AuthGuard
      status={status}
      userRole={session?.user?.role}
      allowedRoles={["member", "admin"]}
      messages={{
        unauthenticated: "Du musst angemeldet sein, um den Kalender zu sehen.",
        accessDenied: "Der Kalender ist nur für Mitglieder der Baugemeinschaft zugänglich.",
      }}
    >
      <div className="bg-zinc-50">
        <div className="container mx-auto max-w-[2000px] px-2 py-2 sm:px-4 sm:py-3">
          <CalendarHeader
            onCreateEvent={handleCreateEvent}
            onRefresh={handleRefresh}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            isLoading={isLoading}
          />

          <ErrorBanner error={error} onDismiss={() => setError(null)} />

          <CalendarComponent
            events={filteredEvents}
            onEventClick={handleEventClick}
            onDateSelect={handleDateSelect}
            onDatesChange={handleDatesChange}
          />
        </div>

        <EventModal
          isOpen={showEventModal}
          onClose={handleCloseModal}
          event={selectedEvent}
          selectedDate={selectedDateRange}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onSaveException={handleSaveException}
          onDeleteOccurrence={handleDeleteOccurrence}
        />
      </div>
    </AuthGuard>
  );
}
