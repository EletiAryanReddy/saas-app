"use client";

import { useEffect, useState } from "react";

interface Props {
  events: any[];
}

export default function ReminderPanel({ events }: Props) {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    const now = new Date();
    const upcoming = events
      .filter((event: any) => new Date(event.startTime) > now)
      .sort((a: any, b: any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 6);
    setUpcomingEvents(upcoming);
  }, [events]);

  const formatTime = (date: string) => {
    const d = new Date(date);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) {
      return `Today, ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}`;
    }
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
  };

  const getTimeColor = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    const hours = diff / (1000 * 60 * 60);
    if (hours < 1) return "text-[var(--error)]";
    if (hours < 24) return "text-[var(--warning)]";
    return "text-[var(--muted)]";
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[var(--text)]">Upcoming Events</h2>
          <span className="text-xs px-2 py-1 bg-[var(--primary-muted)] text-[var(--primary)] rounded-full">
            {upcomingEvents.length}
          </span>
        </div>
      </div>

      <div className="p-4">
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-[var(--bg)] flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-[var(--muted)]">No upcoming events</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event._id} className="group p-3 bg-[var(--bg)] hover:bg-[var(--card-hover)] rounded-xl transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-12 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: event.color || "#6366f1" }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--text)] truncate">{event.title}</h3>
                    <p className={`text-xs ${getTimeColor(event.startTime)} mt-1`}>
                      {formatTime(event.startTime)}
                    </p>
                    {event.participants?.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-1.5">
                          {event.participants.slice(0, 3).map((p: any, i: number) => (
                            <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-[var(--bg)] flex items-center justify-center text-white text-[10px]">
                              {typeof p === "string" ? p.charAt(0) : p.name?.charAt(0) || "?"}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-[var(--muted)]">+{event.participants.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
