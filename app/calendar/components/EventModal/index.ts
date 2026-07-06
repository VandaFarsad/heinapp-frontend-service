// Export der Hauptkomponente
export { default } from "./EventModal";

// Export der Subkomponenten für erweiterte Verwendung
export { default as DeleteConfirmModal } from "./DeleteConfirmModal";
export { default as EventFormComponent } from "./EventForm";
export { default as EventView } from "./EventView";
export { default as RecurrenceInput } from "./RecurrenceInput";
export { useEventModal } from "./useEventModal";

// Export der Typen
export type { EventForm } from "@/types/calendar";
