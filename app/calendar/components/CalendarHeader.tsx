"use client";

import { COMMUNITY_ROOMS, type RoomFilter } from "@/types/calendar";
import { useState } from "react";
import { PlusIcon } from "../../components/icons";

interface CalendarHeaderProps {
  onCreateEvent: () => void;
  onRefresh: () => Promise<void>;
  activeFilter?: RoomFilter;
  onFilterChange?: (filter: RoomFilter) => void;
  isLoading?: boolean;
}

const FILTER_BUTTONS: Array<{ value: RoomFilter; label: string }> = [
  { value: "all", label: "Alle" },
  { value: COMMUNITY_ROOMS.GROUND_FLOOR, label: "Erdgeschoss" },
  { value: COMMUNITY_ROOMS.ROOFTOP, label: "Dach" },
];

export default function CalendarHeader({
  onCreateEvent,
  onRefresh,
  activeFilter = "all",
  onFilterChange,
  isLoading = false,
}: CalendarHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="mb-2 sm:mb-3">
      <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="mb-0.5 truncate text-xl font-semibold text-gray-900 sm:mb-1 sm:text-2xl">HeiNa Kalender</h1>
          <p className="hidden text-xs text-gray-600 sm:block sm:text-sm">
            Alle Termine und Events der Baugemeinschaft
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2 sm:gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3"
            title="Neu laden"
          >
            <svg
              className={`h-5 w-5 ${isRefreshing || isLoading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button
            onClick={onCreateEvent}
            className="flex items-center justify-center gap-2 rounded-lg bg-green-600 p-2 font-medium text-white transition-colors hover:bg-green-700 sm:px-6 sm:py-3"
            title="Neuen Termin erstellen"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Neuen Termin erstellen</span>
          </button>
        </div>
      </div>

      {/* Room Filter Buttons */}
      {onFilterChange && (
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs font-medium text-gray-500 sm:text-sm">Location:</span>
          <div className="inline-flex rounded-lg bg-[#eef2f6] p-0.5">
            {FILTER_BUTTONS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => onFilterChange(filter.value)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all sm:px-4 sm:py-1.5 sm:text-sm ${
                  activeFilter === filter.value
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {filter.value === COMMUNITY_ROOMS.GROUND_FLOOR && (
                    <span
                      className={`inline-block h-2 w-2 rounded-full bg-green-500 ${activeFilter === filter.value ? "opacity-100" : "opacity-50"}`}
                    />
                  )}
                  {filter.value === COMMUNITY_ROOMS.ROOFTOP && (
                    <span
                      className={`inline-block h-2 w-2 rounded-full bg-blue-500 ${activeFilter === filter.value ? "opacity-100" : "opacity-50"}`}
                    />
                  )}
                  {filter.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
