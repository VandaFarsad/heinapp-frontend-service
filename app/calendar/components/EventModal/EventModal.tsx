"use client";

import type { CalendarEvent } from "@/types/calendar";
import { useEffect, useState } from "react";
import { CloseModalIcon } from "../../../components/icons";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EventFormComponent from "./EventForm";
import EventView from "./EventView";
import { EventData, useEventModal } from "./useEventModal";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent;
  selectedDate?: { start: string; end: string };
  onSave: (eventData: EventData) => Promise<void>;
  onDelete?: (eventId: string) => Promise<void>;
  onSaveException?: (masterId: string, occurrenceStart: string, eventData: EventData) => Promise<void>;
  onDeleteOccurrence?: (masterId: string, occurrenceStart: string) => Promise<void>;
}

export default function EventModal({
  isOpen,
  onClose,
  event,
  selectedDate,
  onSave,
  onDelete,
  onSaveException,
  onDeleteOccurrence,
}: EventModalProps) {
  const { mode, setMode, formData, setFormData, validateForm, createEventData } = useEventModal({
    event,
    selectedDate,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [scopeAction, setScopeAction] = useState<"delete" | null>(null);
  const [showSaveScope, setShowSaveScope] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSaveError(null);
      setScopeAction(null);
      setShowSaveScope(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isRecurringOccurrence = !!(event?.rrule && event.occurrenceStart);

  // Adjust form start/end to the clicked occurrence's actual times
  const adjustFormToOccurrence = () => {
    if (!event?.occurrenceStart) return;
    const masterDuration = (event.end as Date).getTime() - (event.start as Date).getTime();
    const occStart = event.occurrenceStart;
    const occEnd = new Date(occStart.getTime() + masterDuration);
    const toLocalString = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setFormData((prev) => ({ ...prev, start: toLocalString(occStart), end: toLocalString(occEnd) }));
  };

  const handleEditClick = () => {
    if (isRecurringOccurrence) {
      // Pre-fill form with occurrence times, ask scope later on save
      adjustFormToOccurrence();
    }
    setMode("edit");
  };

  const handleDeleteClick = () => {
    if (isRecurringOccurrence) {
      setScopeAction("delete");
    } else {
      setShowDeleteConfirm(true);
    }
  };

  // TODO: Add "following" scope for industry-standard behavior
  // See app/calendar/TODO.md for implementation details
  // Standard apps (Google/Outlook/Apple) offer: this | following | all
  const handleScopeSelect = (scope: "this" | "all") => {
    if (showSaveScope) {
      setShowSaveScope(false);
      doSave(scope);
    } else if (scopeAction === "delete") {
      setScopeAction(null);
      if (scope === "this") {
        handleDeleteOccurrence();
      } else {
        setShowDeleteConfirm(true);
      }
    }
  };

  const handleDeleteOccurrence = async () => {
    if (!event?.occurrenceStart || !onDeleteOccurrence) return;
    setIsSubmitting(true);
    setSaveError(null);
    try {
      await onDeleteOccurrence(event.id, event.occurrenceStart.toISOString());
      onClose();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Fehler beim Löschen des Termins");
    } finally {
      setIsSubmitting(false);
    }
  };

  const doSave = async (scope: "this" | "all") => {
    setIsSubmitting(true);
    setSaveError(null);

    try {
      let eventData = createEventData();

      // Wenn "Alle" bei einer wiederkehrenden Occurrence bearbeitet wird:
      // Übernehme die neue Uhrzeit und wende sie auf das Master-Event an
      if (scope === "all" && isRecurringOccurrence && event?.occurrenceStart) {
        const newOccStart = new Date(formData.start);
        const newOccEnd = new Date(formData.end);

        // Master-Datum mit neuer Occurrence-Uhrzeit kombinieren
        const masterDate = new Date(event.start);
        const newMasterStart = new Date(
          masterDate.getFullYear(),
          masterDate.getMonth(),
          masterDate.getDate(),
          newOccStart.getHours(),
          newOccStart.getMinutes(),
          newOccStart.getSeconds(),
        );

        const newMasterEnd = new Date(
          masterDate.getFullYear(),
          masterDate.getMonth(),
          masterDate.getDate(),
          newOccEnd.getHours(),
          newOccEnd.getMinutes(),
          newOccEnd.getSeconds(),
        );

        eventData = {
          ...eventData,
          start: newMasterStart.toISOString(),
          end: newMasterEnd.toISOString(),
        };
      }

      if (scope === "this" && event?.occurrenceStart && onSaveException) {
        await onSaveException(event.id, event.occurrenceStart.toISOString(), eventData);
      } else {
        await onSave(eventData);
      }
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setSaveError(error.message);
      } else {
        setSaveError("Fehler beim Speichern des Termins");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setSaveError(validationError);
      return;
    }

    // For recurring occurrences, ask scope on save
    if (isRecurringOccurrence) {
      setShowSaveScope(true);
      return;
    }

    await doSave("all");
  };

  const handleDelete = async () => {
    if (!event || !onDelete) return;

    setIsSubmitting(true);
    setSaveError(null);
    try {
      await onDelete(event.id);
      onClose();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Fehler beim Löschen des Termins");
    } finally {
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCancel = () => {
    if (showSaveScope) {
      setShowSaveScope(false);
      return;
    }
    if (mode === "edit") {
      setMode("view");
    } else {
      onClose();
    }
  };

  const getModalTitle = () => {
    if (showSaveScope) {
      return "Änderungen speichern";
    }
    if (scopeAction !== null) {
      return "Termin löschen";
    }
    switch (mode) {
      case "create":
        return "Neuen Termin erstellen";
      case "edit":
        return "Termin bearbeiten";
      default:
        return "Termin Details";
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      onClick={handleBackdropClick}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900">{getModalTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            disabled={isSubmitting}
          >
            <CloseModalIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mx-6 mt-4 rounded-lg bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{saveError}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setSaveError(null)}
                  className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none"
                >
                  <span className="sr-only">Schließen</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {showSaveScope ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Dieser Termin ist Teil einer Terminserie. Sollen die Änderungen nur für diesen Termin oder für die
                gesamte Serie gespeichert werden?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleScopeSelect("this")}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  <p className="font-medium text-gray-900">Nur dieser Termin</p>
                  <p className="text-sm text-gray-500">Nur dieses Vorkommen wird geändert</p>
                </button>
                <button
                  onClick={() => handleScopeSelect("all")}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  <p className="font-medium text-gray-900">Alle Termine (Serie)</p>
                  <p className="text-sm text-gray-500">Alle Vorkommen dieser Serie werden geändert</p>
                </button>
                <button
                  onClick={() => setShowSaveScope(false)}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : scopeAction !== null ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Dieser Termin ist Teil einer Terminserie. Was soll gelöscht werden?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleScopeSelect("this")}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  <p className="font-medium text-gray-900">Nur dieser Termin</p>
                  <p className="text-sm text-gray-500">Nur dieses Vorkommen wird betroffen</p>
                </button>
                <button
                  onClick={() => handleScopeSelect("all")}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  <p className="font-medium text-gray-900">Alle Termine (Serie)</p>
                  <p className="text-sm text-gray-500">Alle Vorkommen dieser Serie werden betroffen</p>
                </button>
                <button
                  onClick={() => setScopeAction(null)}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : mode === "view" && event ? (
            <EventView
              event={event}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              isSubmitting={isSubmitting}
              showDeleteButton={!!onDelete || !!onDeleteOccurrence}
            />
          ) : (
            <EventFormComponent
              mode={mode === "edit" ? "edit" : "create"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        event={event}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
