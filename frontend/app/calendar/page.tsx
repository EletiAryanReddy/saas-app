"use client";

import { useEffect, useState } from "react";
import CalendarView from "@/components/calendar/CalendarView";
import EventForm from "@/components/calendar/EventForm";
import ReminderPanel from "@/components/calendar/ReminderPanel";
import { getWorkspaceEvents } from "@/services/api/calendar.service";

export default function CalendarPage() {
  const workspaceId = "6a2c2c86bd54aa6fdf34690a";
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);

  const loadEvents = async () => {
    try {
      const res = await getWorkspaceEvents(workspaceId);
      setEvents(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] p-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-[var(--card)] rounded-lg mb-6" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[500px] bg-[var(--card)] rounded-2xl" />
            <div className="h-[300px] bg-[var(--card)] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Calendar</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Manage your events and schedule</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 h-10 px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Event
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CalendarView events={events} onEventClick={(event) => setSelectedEvent(event)} />
          </div>
          <div>
            <ReminderPanel events={events} />
          </div>
        </div>
      </div>

      {(showCreate || selectedEvent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-lg mx-4 animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <h2 className="font-semibold text-[var(--text)]">{selectedEvent ? "Edit Event" : "Create Event"}</h2>
              <button
                onClick={() => { setShowCreate(false); setSelectedEvent(null); }}
                className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <EventForm
              workspaceId={workspaceId}
              event={selectedEvent}
              onSuccess={loadEvents}
              onClose={() => { setShowCreate(false); setSelectedEvent(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
