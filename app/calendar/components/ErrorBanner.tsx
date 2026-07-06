"use client";

import { CloseIcon, ErrorIcon } from "../../components/icons";

interface ErrorBannerProps {
  error: string | null;
  onDismiss: () => void;
}

export default function ErrorBanner({ error, onDismiss }: ErrorBannerProps) {
  if (!error) return null;

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
      <div className="flex items-center">
        <ErrorIcon className="mr-2 h-5 w-5" size={20} />
        <span>{error}</span>
      </div>
      <button onClick={onDismiss} className="text-red-500 hover:text-red-700">
        <CloseIcon className="h-4 w-4" size={16} />
      </button>
    </div>
  );
}
