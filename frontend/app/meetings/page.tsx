"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWorkspaceMeetings } from "@/services/api/meeting.service";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const res = await getWorkspaceMeetings("6a2c2c86bd54aa6fdf34690a");
      setMeetings(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const upcomingMeetings = meetings.filter((m) => new Date(m.startTime) > now);
  const pastMeetings = meetings.filter((m) => new Date(m.startTime) <= now);

  const getStatusBadge = (meeting: any) => {
    const start = new Date(meeting.startTime);
    const end = new Date(meeting.endTime);
    if (now < start) return { label: "Scheduled", class: "bg-[var(--primary-muted)] text-[var(--primary)]" };
    if (now >= start && now <= end) return { label: "Live", class: "bg-[var(--error-muted)] text-[var(--error)]" };
    return { label: "Completed", class: "bg-[var(--success-muted)] text-[var(--success)]" };
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Meetings</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Schedule and manage your meetings</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 h-10 px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              New Meeting
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            <span className="text-sm font-medium text-[var(--text)]">Live Now</span>
          </div>
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border border-[var(--primary)]/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text)]">Team Standup</h3>
                  <p className="text-sm text-[var(--muted)]">Daily sync meeting - 8 participants</p>
                </div>
              </div>
              <Link href="/meetings/live" className="px-4 py-2 bg-[var(--error)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                Join Now
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <div className="p-4 border-b border-[var(--border)]">
              <h2 className="font-semibold text-[var(--text)]">Upcoming Meetings</h2>
            </div>
            <div className="p-4 space-y-3">
              {loading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-20 bg-[var(--bg)] rounded-xl animate-pulse" />)
              ) : upcomingMeetings.length === 0 ? (
                <div className="text-center py-8 text-[var(--muted)]">No upcoming meetings</div>
              ) : (
                upcomingMeetings.map((meeting) => (
                  <div key={meeting._id} className="p-4 bg-[var(--bg)] hover:bg-[var(--card-hover)] rounded-xl transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-[var(--text)]">{meeting.title || "Untitled Meeting"}</h3>
                        <p className="text-sm text-[var(--muted)] mt-1">
                          {new Date(meeting.startTime).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at{" "}
                          {new Date(meeting.startTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(meeting).class}`}>
                        {getStatusBadge(meeting).label}
                      </span>
                    </div>
                    {(meeting.participants?.length ?? 0) > 0 && (
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex -space-x-1.5">
                          {meeting.participants.slice(0, 4).map((p: any, i: number) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-[var(--bg)] flex items-center justify-center text-white text-xs">
                              {typeof p === "string" ? p.charAt(0) : p.name?.charAt(0) || "?"}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-[var(--muted)]">{meeting.participants.length} participants</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <div className="p-4 border-b border-[var(--border)]">
              <h2 className="font-semibold text-[var(--text)]">Past Meetings</h2>
            </div>
            <div className="p-4 space-y-3">
              {loading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-20 bg-[var(--bg)] rounded-xl animate-pulse" />)
              ) : pastMeetings.length === 0 ? (
                <div className="text-center py-8 text-[var(--muted)]">No past meetings</div>
              ) : (
                pastMeetings.slice(0, 5).map((meeting) => (
                  <div key={meeting._id} className="p-4 bg-[var(--bg)] rounded-xl opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[var(--text)]">{meeting.title || "Untitled Meeting"}</h3>
                        <p className="text-sm text-[var(--muted)] mt-1">
                          {new Date(meeting.startTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                      <button className="text-xs text-[var(--primary)] hover:underline">View Recording</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
