"use client";

import { COMMUNITY_ROOMS, type EventForm } from "@/types/calendar";
import { useCallback, useState } from "react";
import RecurrenceInput from "./RecurrenceInput";

interface EventFormProps {
  mode: "edit" | "create";
  formData: EventForm;
  setFormData: React.Dispatch<React.SetStateAction<EventForm>>;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function EventFormComponent({
  mode,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isSubmitting,
}: EventFormProps) {
  // Track if user wants custom location input
  const [showCustomLocation, setShowCustomLocation] = useState(() => {
    return (
      formData.location !== "" &&
      formData.location !== COMMUNITY_ROOMS.GROUND_FLOOR &&
      formData.location !== COMMUNITY_ROOMS.ROOFTOP
    );
  });

  const handleAllDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const newFormData = { ...formData, allDay: isChecked };

    if (isChecked) {
      // Wenn "Ganztägig" aktiviert wird, entferne die Zeit
      newFormData.start = formData.start.split("T")[0];
      newFormData.end = formData.end.split("T")[0];
    } else {
      // Wenn "Ganztägig" deaktiviert wird, füge Standardzeiten hinzu
      const startDate = formData.start.split("T")[0];
      const endDate = formData.end.split("T")[0];
      newFormData.start = `${startDate}T12:00`;
      newFormData.end = `${endDate}T13:00`;
    }

    setFormData(newFormData);
  };

  const getCurrentLocationValue = () => {
    if (showCustomLocation) return "custom";
    if (formData.location === COMMUNITY_ROOMS.GROUND_FLOOR) return COMMUNITY_ROOMS.GROUND_FLOOR;
    if (formData.location === COMMUNITY_ROOMS.ROOFTOP) return COMMUNITY_ROOMS.ROOFTOP;
    return "";
  };

  const handleRruleChange = useCallback(
    (rrule: string) => {
      setFormData((prev) => ({ ...prev, rrule }));
    },
    [setFormData],
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Titel *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          placeholder="z.B. Baugemeinschafts-Meeting"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex items-center">
        <input
          id="allDay"
          name="allDay"
          type="checkbox"
          checked={formData.allDay}
          onChange={handleAllDayChange}
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          disabled={isSubmitting}
        />
        <label htmlFor="allDay" className="ml-2 block text-sm text-gray-900">
          Ganztägiger Termin
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {formData.allDay ? "Startdatum *" : "Start *"}
          </label>
          <input
            type={formData.allDay ? "date" : "datetime-local"}
            required
            value={formData.allDay ? formData.start.substring(0, 10) : formData.start}
            onChange={(e) => setFormData({ ...formData, start: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {formData.allDay ? "Enddatum *" : "Ende *"}
          </label>
          <input
            type={formData.allDay ? "date" : "datetime-local"}
            required
            value={formData.allDay ? formData.end.substring(0, 10) : formData.end}
            onChange={(e) => setFormData({ ...formData, end: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Ort / Gemeinschaftsraum</label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setShowCustomLocation(false);
              setFormData({ ...formData, location: "" });
            }}
            disabled={isSubmitting}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              getCurrentLocationValue() === ""
                ? "border-2 border-gray-400 bg-gray-200 text-gray-900"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Kein Raum
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomLocation(false);
              setFormData({ ...formData, location: COMMUNITY_ROOMS.GROUND_FLOOR });
            }}
            disabled={isSubmitting}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              getCurrentLocationValue() === COMMUNITY_ROOMS.GROUND_FLOOR
                ? "border-2 border-green-600 bg-green-500 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Erdgeschoss
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomLocation(false);
              setFormData({ ...formData, location: COMMUNITY_ROOMS.ROOFTOP });
            }}
            disabled={isSubmitting}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              getCurrentLocationValue() === COMMUNITY_ROOMS.ROOFTOP
                ? "border-2 border-blue-600 bg-blue-500 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Dach
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomLocation(true);
              setFormData({ ...formData, location: "" });
            }}
            disabled={isSubmitting}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              showCustomLocation
                ? "border-2 border-gray-800 bg-gray-700 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Andere Location...
          </button>
        </div>

        {showCustomLocation && (
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            placeholder="z.B. Online, Café, etc."
            disabled={isSubmitting}
          />
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Link</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          placeholder="z.B. https://zoom.us/j/123456789"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Beschreibung</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          rows={4}
          placeholder="Optional: Weitere Details zum Termin"
          disabled={isSubmitting}
        />
      </div>

      {/* Recurrence */}
      <RecurrenceInput
        value={formData.rrule}
        onChange={handleRruleChange}
        startDate={formData.start}
        disabled={isSubmitting}
      />

      {/* Form Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          disabled={isSubmitting}
        >
          {mode === "edit" ? "Zurück" : "Abbrechen"}
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim()}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
              {mode === "edit" ? "Speichere..." : "Erstelle..."}
            </>
          ) : mode === "edit" ? (
            "Speichern"
          ) : (
            "Erstellen"
          )}
        </button>
      </div>
    </form>
  );
}
