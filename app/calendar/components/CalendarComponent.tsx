"use client";

import { type CalendarEvent } from "@/types/calendar";
import type { EventContentArg, EventInput } from "@fullcalendar/core";
import deLocale from "@fullcalendar/core/locales/de";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import rrulePlugin from "@fullcalendar/rrule";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMemo } from "react";
import {
  getRoomColors,
  parseExDateToLocalFloating,
  parseRRuleString,
  ROOM_COLORS,
  toLocalFloatingDateString,
} from "../utils/calendarHelpers";
import "./calendar.css";

export type { CalendarEvent } from "@/types/calendar";

interface CalendarComponentProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateSelect: (dateRange: { start: string; end: string }) => void;
  onDatesChange?: (dateRange: { start: Date; end: Date }) => void;
}

function mapEventToInput(event: CalendarEvent): EventInput {
  const colors = getRoomColors(event.location);

  const eventObj: EventInput = {
    id: event.id,
    title: event.title,
    allDay: event.allDay,
    extendedProps: {
      description: event.description,
      location: event.location,
      url: event.url,
      rrule: event.rrule,
    },
    backgroundColor: event.allDay ? colors.bg : "transparent",
    borderColor: event.allDay ? colors.border : "transparent",
    textColor: event.allDay ? "#ffffff" : "#374151",
  };

  if (event.rrule && event.rrule.trim()) {
    eventObj.rrule = {
      dtstart: toLocalFloatingDateString(event.start as Date),
      ...parseRRuleString(event.rrule),
    };
    eventObj.duration = {
      milliseconds: (event.end as Date).getTime() - (event.start as Date).getTime(),
    };

    if (event.exdate && event.exdate.trim()) {
      const exdates = event.exdate
        .split(",")
        .map((d) => parseExDateToLocalFloating(d))
        .filter((s): s is string => s !== null);
      if (exdates.length > 0) {
        eventObj.exdate = exdates;
      }
    }
  } else {
    eventObj.start = event.start;
    eventObj.end = event.end;
  }

  return eventObj;
}

export default function CalendarComponent({
  events,
  onEventClick,
  onDateSelect,
  onDatesChange,
}: CalendarComponentProps) {
  const calendarEvents = useMemo(() => events.map(mapEventToInput), [events]);

  const renderEventContent = (eventInfo: EventContentArg) => {
    const location = eventInfo.event.extendedProps?.location;
    const isListView = eventInfo.view.type.includes("list");
    const isAllDay = eventInfo.event.allDay;

    let roomIndicator = null;
    if (!isListView && !isAllDay) {
      const roomColor = ROOM_COLORS[location as keyof typeof ROOM_COLORS];
      if (roomColor) {
        roomIndicator = (
          <div
            className="h-3 w-3 flex-shrink-0 rounded border-2 border-white"
            style={{ backgroundColor: roomColor.bg }}
          ></div>
        );
      }
    }

    return (
      <div className="flex items-center gap-1.5 overflow-hidden px-1">
        {roomIndicator}
        {eventInfo.timeText && <span className="flex-shrink-0 text-xs">{eventInfo.timeText}</span>}
        <span className="truncate text-xs font-medium">{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm sm:rounded-2xl">
      <div className="p-1.5 sm:p-3">
        <div className="calendar-container h-[82vh] sm:h-[75vh]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, rrulePlugin]}
            initialView="dayGridMonth"
            locale={deLocale}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            events={calendarEvents}
            editable={false}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            height="100%"
            eventClassNames={(arg) => {
              const end = arg.event.end ?? arg.event.start;
              return end && end < new Date() ? ["fc-event-past"] : [];
            }}
            eventContent={renderEventContent}
            datesSet={(dateInfo) => {
              onDatesChange?.({ start: dateInfo.start, end: dateInfo.end });
            }}
            eventClick={(info) => {
              const event = events.find((e) => e.id === info.event.id);
              const fallbackEvent: CalendarEvent = {
                id: info.event.id || "",
                title: info.event.title,
                start: info.event.start || new Date(),
                end: info.event.end || new Date(),
                allDay: info.event.allDay || false,
                description: info.event.extendedProps?.description || "",
                location: info.event.extendedProps?.location || "",
                url: info.event.extendedProps?.url || "",
                rrule: info.event.extendedProps?.rrule || "",
                exdate: "",
              };
              const baseEvent = event ?? fallbackEvent;
              onEventClick({ ...baseEvent, occurrenceStart: info.event.start ?? undefined });
            }}
            select={(info) => {
              onDateSelect({
                start: info.startStr,
                end: info.endStr,
              });
              info.view.calendar.unselect();
            }}
          />
        </div>
      </div>
    </div>
  );
}
