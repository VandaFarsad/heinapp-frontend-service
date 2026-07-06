"use client";

import { useEffect, useRef, useState } from "react";
import { RRule } from "rrule";
import { normalizeRRuleForParsing } from "./icalUtils";

interface RecurrenceInputProps {
  value: string;
  onChange: (rrule: string) => void;
  startDate: string;
  disabled?: boolean;
}

type FrequencyType = "NONE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

interface RecurrenceState {
  frequency: FrequencyType;
  interval: number;
  endType: "never" | "count" | "until";
  count: number;
  until: string;
  byweekday: number[];
}

const WEEKDAYS = [
  { value: RRule.MO.weekday, label: "Mo" },
  { value: RRule.TU.weekday, label: "Di" },
  { value: RRule.WE.weekday, label: "Mi" },
  { value: RRule.TH.weekday, label: "Do" },
  { value: RRule.FR.weekday, label: "Fr" },
  { value: RRule.SA.weekday, label: "Sa" },
  { value: RRule.SU.weekday, label: "So" },
];

export default function RecurrenceInput({ value, onChange, startDate, disabled }: RecurrenceInputProps) {
  const [state, setState] = useState<RecurrenceState>({
    frequency: "NONE",
    interval: 1,
    endType: "never",
    count: 10,
    until: "",
    byweekday: [],
  });

  // Track if we're initializing from external value
  const isInitializing = useRef(false);
  const lastParsedValue = useRef<string>("");

  // Parse existing RRULE value on mount or when value changes
  useEffect(() => {
    // Skip if we've already parsed this exact value
    if (value === lastParsedValue.current) {
      return;
    }

    if (value && value.trim()) {
      isInitializing.current = true;
      try {
        const rruleString = normalizeRRuleForParsing(value, startDate ? new Date(startDate) : new Date());

        const rrule = RRule.fromString(rruleString);
        const options = rrule.origOptions;

        let freq: FrequencyType = "NONE";
        if (options.freq === RRule.DAILY) freq = "DAILY";
        else if (options.freq === RRule.WEEKLY) freq = "WEEKLY";
        else if (options.freq === RRule.MONTHLY) freq = "MONTHLY";
        else if (options.freq === RRule.YEARLY) freq = "YEARLY";

        let endType: "never" | "count" | "until" = "never";
        if (options.count) endType = "count";
        else if (options.until) endType = "until";

        const byweekday: number[] = [];
        if (options.byweekday) {
          const days = Array.isArray(options.byweekday) ? options.byweekday : [options.byweekday];
          days.forEach((day: any) => {
            if (typeof day === "number") {
              byweekday.push(day);
            } else if (day && typeof day.weekday === "number") {
              byweekday.push(day.weekday);
            }
          });
        }

        setState({
          frequency: freq,
          interval: options.interval || 1,
          endType,
          count: options.count || 10,
          until: options.until ? options.until.toISOString().split("T")[0] : "",
          byweekday,
        });

        lastParsedValue.current = value;
      } catch {
      } finally {
        isInitializing.current = false;
      }
    } else if (!value || value.trim() === "") {
      // Reset to NONE if value is empty
      setState({
        frequency: "NONE",
        interval: 1,
        endType: "never",
        count: 10,
        until: "",
        byweekday: [],
      });
      lastParsedValue.current = "";
    }
  }, [value, startDate]);

  // Generate RRULE string from state
  useEffect(() => {
    // Don't generate RRULE while we're initializing from external value
    if (isInitializing.current) {
      return;
    }

    if (state.frequency === "NONE") {
      if (lastParsedValue.current !== "") {
        onChange("");
        lastParsedValue.current = "";
      }
      return;
    }

    try {
      const dtstart = new Date(startDate);
      if (isNaN(dtstart.getTime())) {
        return;
      }

      const ruleOptions: any = {
        freq: RRule[state.frequency],
        interval: state.interval,
        dtstart,
      };

      if (state.endType === "count") {
        ruleOptions.count = state.count;
      } else if (state.endType === "until" && state.until) {
        ruleOptions.until = new Date(state.until + "T23:59:59Z");
      }

      if (state.frequency === "WEEKLY" && state.byweekday.length > 0) {
        ruleOptions.byweekday = state.byweekday;
      }

      const rrule = new RRule(ruleOptions);
      // Extract just the RRULE part without DTSTART
      const rruleStr = rrule.toString().split("\n").find((line) => line.startsWith("RRULE:"));
      const newRrule = rruleStr ? rruleStr.replace("RRULE:", "") : "";
      
      // Only call onChange if the value actually changed
      if (newRrule !== lastParsedValue.current) {
        onChange(newRrule);
        lastParsedValue.current = newRrule;
      }
    } catch {
    }
  }, [state, startDate, onChange]);

  const updateState = (updates: Partial<RecurrenceState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const toggleWeekday = (weekday: number) => {
    setState((prev) => {
      const byweekday = prev.byweekday.includes(weekday)
        ? prev.byweekday.filter((d) => d !== weekday)
        : [...prev.byweekday, weekday].sort();
      return { ...prev, byweekday };
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Wiederholung</label>
        <select
          value={state.frequency}
          onChange={(e) => updateState({ frequency: e.target.value as FrequencyType })}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          disabled={disabled}
        >
          <option value="NONE">Keine Wiederholung</option>
          <option value="DAILY">Täglich</option>
          <option value="WEEKLY">Wöchentlich</option>
          <option value="MONTHLY">Monatlich</option>
          <option value="YEARLY">Jährlich</option>
        </select>
      </div>

      {state.frequency !== "NONE" && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Alle {state.interval > 1 ? state.interval : ""}{" "}
              {state.frequency === "DAILY"
                ? state.interval === 1
                  ? "Tag"
                  : "Tage"
                : state.frequency === "WEEKLY"
                  ? state.interval === 1
                    ? "Woche"
                    : "Wochen"
                  : state.frequency === "MONTHLY"
                    ? state.interval === 1
                      ? "Monat"
                      : "Monate"
                    : state.interval === 1
                      ? "Jahr"
                      : "Jahre"}
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={state.interval}
              onChange={(e) => updateState({ interval: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-500"
              disabled={disabled}
            />
          </div>

          {state.frequency === "WEEKLY" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Wiederhole an</label>
              <div className="flex gap-2">
                {WEEKDAYS.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleWeekday(day.value)}
                    disabled={disabled}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                      state.byweekday.includes(day.value)
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-green-500"
                    } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Endet</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="endType"
                  value="never"
                  checked={state.endType === "never"}
                  onChange={(e) => updateState({ endType: "never" })}
                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                  disabled={disabled}
                />
                <span className="ml-2 text-sm text-gray-900">Nie</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="endType"
                  value="count"
                  checked={state.endType === "count"}
                  onChange={(e) => updateState({ endType: "count" })}
                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                  disabled={disabled}
                />
                <span className="text-sm text-gray-900">Nach</span>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={state.count}
                  onChange={(e) => updateState({ endType: "count", count: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-20 rounded border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  disabled={disabled || state.endType !== "count"}
                />
                <span className="text-sm text-gray-900">Wiederholungen</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="endType"
                  value="until"
                  checked={state.endType === "until"}
                  onChange={(e) => updateState({ endType: "until" })}
                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                  disabled={disabled}
                />
                <span className="text-sm text-gray-900">Am</span>
                <input
                  type="date"
                  value={state.until}
                  onChange={(e) => updateState({ endType: "until", until: e.target.value })}
                  className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  disabled={disabled || state.endType !== "until"}
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
