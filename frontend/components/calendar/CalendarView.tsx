"use client";

import { useState } from "react";

import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

interface Props {
  events: any[];
  onEventClick?: (event: any) => void;
}

export default function CalendarView({
  events,
  onEventClick,
}: Props) {
  const [view, setView] =
    useState<"month" | "week" | "day">(
      "month"
    );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Calendar
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setView("month")}
            className={
              view === "month"
                ? "px-4 py-2 rounded bg-blue-600 text-white"
                : "px-4 py-2 rounded border"
            }
          >
            Month
          </button>

          <button
            onClick={() => setView("week")}
            className={
              view === "week"
                ? "px-4 py-2 rounded bg-blue-600 text-white"
                : "px-4 py-2 rounded border"
            }
          >
            Week
          </button>

          <button
            onClick={() => setView("day")}
            className={
              view === "day"
                ? "px-4 py-2 rounded bg-blue-600 text-white"
                : "px-4 py-2 rounded border"
            }
          >
            Day
          </button>
        </div>
      </div>

      {view === "month" && (
        <MonthView
          events={events}
          onEventClick={onEventClick}
        />
      )}

      {view === "week" && (
        <WeekView
          events={events}
          onEventClick={onEventClick}
        />
      )}

      {view === "day" && (
        <DayView
          events={events}
          onEventClick={onEventClick}
        />
      )}
    </div>
  );
}