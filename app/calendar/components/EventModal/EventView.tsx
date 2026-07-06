"use client";

import { CalendarIcon, DocumentIcon, LocationIcon } from "@/app/components/icons";
import { type CalendarEvent } from "@/types/calendar";
import { formatRecurrence } from "./rrule-de";

interface EventViewProps {
  event: CalendarEvent;
  onEdit: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
  showDeleteButton?: boolean;
}

export default function EventView({ event, onEdit, onDelete, isSubmitting, showDeleteButton = true }: EventViewProps) {
  const formatDateTime = (date: Date) => {
    return {
      date: date.toLocaleDateString("de-DE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-3xl font-bold text-gray-900">{event.title}</h3>
      </div>

      <div className="space-y-4 rounded-xl bg-gray-50 p-4">
        <div className="flex items-start space-x-3">
          <CalendarIcon className="mt-0.5 h-5 w-5 text-green-600" />
          <div>
            <p className="font-medium text-gray-900">{formatDateTime(event.start).date}</p>
            <p className="text-sm text-gray-600">
              {formatDateTime(event.start).time} - {formatDateTime(event.end).time}
            </p>
          </div>
        </div>

        {event.location && (
          <div className="flex items-start space-x-3">
            <LocationIcon className="mt-0.5 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Ort</p>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          </div>
        )}

        {event.rrule && event.rrule.trim() && (
          <div className="flex items-start space-x-3">
            <CalendarIcon className="mt-0.5 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Wiederholung</p>
              <p className="text-sm text-gray-600">{formatRecurrence(event.rrule, event.start)}</p>
            </div>
          </div>
        )}

        {event.url && (
          <div className="flex items-start space-x-3">
            <DocumentIcon className="mt-0.5 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Link</p>
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm break-all text-blue-600 underline hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                {event.url}
              </a>
            </div>
          </div>
        )}

        {event.description && (
          <div className="flex items-start space-x-3">
            <DocumentIcon className="mt-0.5 h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Beschreibung</p>
              <p className="text-sm whitespace-pre-wrap text-gray-600">{event.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onEdit}
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Bearbeiten
        </button>
        {showDeleteButton && (
          <button
            onClick={onDelete}
            disabled={isSubmitting}
            className="rounded-lg border border-red-300 px-6 py-3 font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Löschen
          </button>
        )}
      </div>
    </div>
  );
}
