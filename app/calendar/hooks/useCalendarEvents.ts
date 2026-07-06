"use client";

import type { CalendarEvent, EventData, RoomFilter } from "@/types/calendar";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface BackendCalendarEvent {
  uid: string;
  title: string;
  start_date: string;
  end_date: string;
  all_day: boolean;
  description?: string;
  location?: string;
  url?: string;
  rrule?: string;
  exdate?: string;
}

export function useCalendarEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Modal State
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: string; end: string } | undefined>();

  // Room Filter State
  const [activeFilter, setActiveFilter] = useState<RoomFilter>("all");

  // Current visible date range — drives both event loading and reloads after save/delete.
  const [currentDateRange, setCurrentDateRange] = useState<{ start: Date; end: Date } | null>(null);
  const visibleRange = useRef<{ start: Date; end: Date } | undefined>(undefined);

  // Events laden
  const loadEvents = useCallback(
    async (userRole?: string, forceSync = false, dateRange?: { start: Date; end: Date }) => {
      if (!session?.access_token) return;
      if (userRole !== "member" && userRole !== "admin") return;

      // Cancel any in-flight request to prevent stale responses
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        setIsLoading(true);
        setError(null);

        // Use provided date range (from calendar navigation) or default
        let startDate: Date;
        let endDate: Date;
        if (dateRange) {
          startDate = dateRange.start;
          endDate = dateRange.end;
        } else {
          const now = new Date();
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          endDate = new Date(now.getFullYear(), now.getMonth() + 6, 0);
        }

        const params = new URLSearchParams({
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          force_sync: forceSync.toString(),
        });

        const response = await fetch(`/api/calendar/events?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Only update state if this request was not aborted
        if (!controller.signal.aborted) {
          setEvents(
            data.events.map((e: BackendCalendarEvent) => ({
              id: e.uid,
              title: e.title,
              start: new Date(e.start_date),
              end: new Date(e.end_date),
              allDay: e.all_day,
              description: e.description || "",
              location: e.location || "",
              url: e.url || "",
              rrule: e.rrule || "",
              exdate: e.exdate || "",
            })),
          );
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Es ist ein Fehler beim Laden der Events aufgetreten.");
      } finally {
        setIsLoading(false);
      }
    },
    [session?.access_token],
  );

  // Event erstellen/aktualisieren
  const saveEvent = useCallback(
    async (eventData: EventData) => {
      if (!session?.access_token) throw new Error("Not authenticated");

      const isUpdate = !!eventData.id;
      const url = isUpdate ? `/api/calendar/events/${eventData.id}` : `/api/calendar/events`;

      // Transform frontend data to backend format
      const backendData = {
        title: eventData.title,
        description: eventData.description || "",
        start_date: eventData.start,
        end_date: eventData.end,
        location: eventData.location || "",
        url: eventData.url || "",
        all_day: eventData.allDay || false,
        rrule: eventData.rrule || "",
        exdate: eventData.exdate || "",
      };

      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendData),
      });
      const result = await response.json();

      if (!response.ok) {
        // Handle DRF validation errors (e.g., { "location": ["error message"] })
        const errorMessages = Object.entries(result)
          .filter(([key]) => key !== "detail")
          .map(([, messages]) => {
            if (Array.isArray(messages)) {
              return messages.join(", ");
            }
            return String(messages);
          })
          .join("; ");
        throw new Error(result.detail || errorMessages || `HTTP ${response.status}: ${response.statusText}`);
      }

      return result.event;
    },
    [session?.access_token],
  );

  // Event löschen
  const deleteEvent = useCallback(
    async (eventId: string) => {
      if (!session?.access_token) throw new Error("Not authenticated");

      const response = await fetch(`/api/calendar/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail || `HTTP ${response.status}: ${response.statusText}`);
      }
    },
    [session?.access_token],
  );

  // Einzelnes Vorkommen eines wiederkehrenden Termins bearbeiten
  const saveException = useCallback(
    async (masterId: string, occurrenceStart: string, eventData: EventData) => {
      if (!session?.access_token) throw new Error("Not authenticated");

      const backendData = {
        occurrence_start: occurrenceStart,
        title: eventData.title,
        description: eventData.description || "",
        start_date: eventData.start,
        end_date: eventData.end,
        location: eventData.location || "",
        url: eventData.url || "",
        all_day: eventData.allDay || false,
      };

      const response = await fetch(`/api/calendar/events/${masterId}/exception`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessages = Object.entries(result)
          .filter(([key]) => key !== "detail")
          .map(([, messages]) => (Array.isArray(messages) ? messages.join(", ") : String(messages)))
          .join("; ");
        throw new Error(result.detail || errorMessages || `HTTP ${response.status}: ${response.statusText}`);
      }

      return result;
    },
    [session?.access_token],
  );

  // Einzelnes Vorkommen eines wiederkehrenden Termins löschen
  const deleteOccurrence = useCallback(
    async (masterId: string, occurrenceStart: string) => {
      if (!session?.access_token) throw new Error("Not authenticated");

      const response = await fetch(
        `/api/calendar/events/${masterId}/occurrence`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ occurrence_start: occurrenceStart }),
        },
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.detail || `HTTP ${response.status}: ${response.statusText}`);
      }
    },
    [session?.access_token],
  );

  // Single effect for loading events: fires on initial mount (via datesSet → setCurrentDateRange),
  // on calendar navigation, and on session changes (e.g. token refresh).
  // Debounced to avoid flooding the backend with requests during rapid navigation.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!currentDateRange) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      loadEvents(session?.user?.role, false, currentDateRange);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [currentDateRange, session?.user?.role, session?.access_token, loadEvents]);

  // Stable callback for date changes from FullCalendar
  const handleDatesChange = useCallback((dateRange: { start: Date; end: Date }) => {
    visibleRange.current = dateRange;
    setCurrentDateRange((prev) => {
      // Avoid unnecessary state update (and re-fetch) if the range hasn't changed
      if (
        prev &&
        prev.start.getTime() === dateRange.start.getTime() &&
        prev.end.getTime() === dateRange.end.getTime()
      ) {
        return prev;
      }
      return dateRange;
    });
  }, []);

  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (activeFilter === "all") {
      return events;
    }
    return events.filter((event) => event.location === activeFilter);
  }, [events, activeFilter]);

  // Event erstellen/aktualisieren (complete workflow)
  const handleSaveEvent = useCallback(
    async (eventData: EventData) => {
      await saveEvent(eventData);
      await loadEvents(session?.user?.role, false, visibleRange.current);
      setShowEventModal(false);
      setSelectedEvent(undefined);
      setSelectedDateRange(undefined);
    },
    [saveEvent, loadEvents, session?.user?.role],
  );

  // Event löschen (complete workflow)
  const handleDeleteEvent = useCallback(
    async (eventId: string) => {
      await deleteEvent(eventId);
      await loadEvents(session?.user?.role, false, visibleRange.current);
      setShowEventModal(false);
      setSelectedEvent(undefined);
    },
    [deleteEvent, loadEvents, session?.user?.role],
  );

  // Einzelnes Vorkommen eines wiederkehrenden Termins bearbeiten (complete workflow)
  const handleSaveException = useCallback(
    async (masterId: string, occurrenceStart: string, eventData: EventData) => {
      await saveException(masterId, occurrenceStart, eventData);
      await loadEvents(session?.user?.role, false, visibleRange.current);
      setShowEventModal(false);
      setSelectedEvent(undefined);
    },
    [saveException, loadEvents, session?.user?.role],
  );

  // Einzelnes Vorkommen eines wiederkehrenden Termins löschen (complete workflow)
  const handleDeleteOccurrence = useCallback(
    async (masterId: string, occurrenceStart: string) => {
      await deleteOccurrence(masterId, occurrenceStart);
      await loadEvents(session?.user?.role, false, visibleRange.current);
      setShowEventModal(false);
      setSelectedEvent(undefined);
    },
    [deleteOccurrence, loadEvents, session?.user?.role],
  );

  // Modal control handlers
  const handleCreateEvent = useCallback(() => {
    setSelectedEvent(undefined);
    setSelectedDateRange(undefined);
    setShowEventModal(true);
  }, []);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDateRange(undefined);
    setShowEventModal(true);
  }, []);

  const handleDateSelect = useCallback((dateRange: { start: string; end: string }) => {
    setSelectedEvent(undefined);
    setSelectedDateRange(dateRange);
    setShowEventModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowEventModal(false);
    setSelectedEvent(undefined);
    setSelectedDateRange(undefined);
  }, []);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    await loadEvents(session?.user?.role, true, visibleRange.current);
  }, [loadEvents, session?.user?.role]);

  return {
    // Data
    events,
    filteredEvents,
    error,
    isLoading,
    setError,
    // Modal State
    showEventModal,
    selectedEvent,
    selectedDateRange,
    // Filter State
    activeFilter,
    setActiveFilter,
    // Low-level API methods (for backward compatibility)
    loadEvents,
    saveEvent,
    deleteEvent,
    saveException,
    deleteOccurrence,
    // High-level handlers (complete workflows)
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
  };
}
