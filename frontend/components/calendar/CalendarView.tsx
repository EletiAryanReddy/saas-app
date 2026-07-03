"use client";

import { useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

interface Props {
  events: any[];
  onEventClick?: (event: any) => void;
}

export default function CalendarView({ events, onEventClick }: Props) {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-[var(--text)] min-w-[180px] text-center">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary-muted)] rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
        <div className="flex items-center gap-1 bg-[var(--bg)] rounded-lg p-1">
          {(["month", "week", "day"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                view === v ? "bg-[var(--primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text)]"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {view === "month" && <MonthView events={events} onEventClick={onEventClick} currentDate={currentDate} />}
        {view === "week" && <WeekView events={events} onEventClick={onEventClick} />}
        {view === "day" && <DayView events={events} onEventClick={onEventClick} />}
      </div>
    </div>
  );
}
