"use client";

import type { CalendarEvent } from "@/types/calendar";
import { WarningIcon } from "../../../components/icons";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  event?: CalendarEvent;
  isSubmitting: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  event,
  isSubmitting,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-[60] flex items-center justify-center bg-black"
      onClick={handleBackdropClick}
    >
      <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <WarningIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">Termin löschen?</h3>
          <p className="mb-6 text-sm text-gray-500">
            Sind Sie sicher, dass Sie "{event?.title}" löschen möchten? Diese Aktion kann nicht rückgängig gemacht
            werden.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Abbrechen
            </button>
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Lösche...
                </>
              ) : (
                "Löschen"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
