"use client";

import type { CalendarEvent, EventData, EventForm } from "@/types/calendar";
import { useEffect, useState } from "react";

export type { EventData } from "@/types/calendar";

interface UseEventModalProps {
  event?: CalendarEvent;
  selectedDate?: { start: string; end: string };
}

export function useEventModal({ event, selectedDate }: UseEventModalProps) {
  const [mode, setMode] = useState<"view" | "edit" | "create">("create");
  const [formData, setFormData] = useState<EventForm>({
    title: "",
    start: "",
    end: "",
    allDay: false,
    description: "",
    location: "",
    url: "",
    rrule: "",
    exdate: "",
  });

  // Mode basierend auf event prop aktualisieren
  useEffect(() => {
    if (event) {
      setMode("view");
    } else {
      setMode("create");
    }
  }, [event]);

  // Formular-State aktualisieren wenn sich event oder selectedDate ändert
  useEffect(() => {
    if (event) {
      let endDate = event.end;

      // Für ganztägige Events das Enddatum um einen Tag reduzieren,
      // da das Backend die iCalendar-Konvention verwendet (DTEND ist exklusiv)
      if (event.allDay) {
        endDate = new Date(event.end);
        endDate.setDate(endDate.getDate() - 1);
      }

      setFormData({
        title: event.title,
        start: new Date(event.start.getTime() - event.start.getTimezoneOffset() * 60000).toISOString().slice(0, 16),
        end: new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16),
        allDay: event.allDay || false,
        description: event.description || "",
        location: event.location || "",
        url: event.url || "",
        rrule: event.rrule || "",
        exdate: event.exdate || "",
      });
    } else if (selectedDate) {
      const isAllDaySelection = !selectedDate.start.includes("T");
      let uiEndDate = selectedDate.end;
      let uiStartDate = selectedDate.start;

      // Korrigiert das Enddatum für die Anzeige bei ganztägigen Events
      if (isAllDaySelection) {
        const end = new Date(selectedDate.end);
        end.setDate(end.getDate() - 1);
        uiEndDate = end.toISOString().split("T")[0];
        uiStartDate = selectedDate.start.split("T")[0];
      }

      setFormData({
        title: "",
        start: uiStartDate,
        end: uiEndDate,
        allDay: isAllDaySelection,
        description: "",
        location: "",
        url: "",
        rrule: "",
        exdate: "",
      });
    } else {
      // Standardmäßig ein ganztägiges Ereignis für heute erstellen
      const today = new Date();
      const todayString = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

      setFormData({
        title: "",
        start: todayString,
        end: todayString,
        allDay: true,
        description: "",
        location: "",
        url: "",
        rrule: "",
        exdate: "",
      });
    }
  }, [event, selectedDate]);

  const validateForm = (): string | null => {
    if (!formData.title.trim()) {
      return "Bitte geben Sie einen Titel ein.";
    }

    const startDate = new Date(formData.start);
    const endDate = new Date(formData.end);

    if (formData.allDay) {
      if (endDate < startDate) {
        return "Das Enddatum darf nicht vor dem Startdatum liegen.";
      }
    } else {
      if (endDate <= startDate) {
        return "Die Endzeit muss nach der Startzeit liegen.";
      }
    }

    return null;
  };

  const createEventData = (): EventData => {
    const startDate = new Date(formData.start);
    const endDate = new Date(formData.end);

    // Für ganztägige Events das Enddatum um einen Tag erhöhen,
    // da das der iCalendar-Standard ist (DTEND ist exklusiv)
    if (formData.allDay) {
      endDate.setDate(endDate.getDate() + 1);
    }

    return {
      ...(event && { id: event.id }),
      title: formData.title.trim(),
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      allDay: formData.allDay,
      description: formData.description.trim(),
      location: formData.location.trim(),
      url: formData.url.trim(),
      rrule: formData.rrule.trim(),
      exdate: formData.exdate.trim(),
    };
  };

  return {
    mode,
    setMode,
    formData,
    setFormData,
    validateForm,
    createEventData,
  };
}
