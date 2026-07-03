"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import { getDashboard } from "@/services/api/dashboard.service";

interface Activity {
  id: string;
  type: "task" | "comment" | "file" | "meeting" | "project";
  title: string;
  user: { name: string; avatar: string };
  time: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  type: "meeting" | "deadline" | "event";
  time: string;
  participants?: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const workspaceId = "6a2c2c86bd54aa6fdf34690a";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboard(workspaceId);
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activities: Activity[] = [
    { id: "1", type: "task", title: "Completed API Integration", user: { name: "Sarah Chen", avatar: "SC" }, time: "2 min ago" },
    { id: "2", type: "comment", title: "Commented on Design Review", user: { name: "Mike Ross", avatar: "MR" }, time: "15 min ago" },
    { id: "3", type: "file", title: "Uploaded presentation.pdf", user: { name: "Emma Wilson", avatar: "EW" }, time: "1 hour ago" },
    { id: "4", type: "meeting", title: "Scheduled team standup", user: { name: "Aryan Reddy", avatar: "AR" }, time: "2 hours ago" },
    { id: "5", type: "project", title: "Created Project Alpha", user: { name: "Sarah Chen", avatar: "SC" }, time: "3 hours ago" },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    { id: "1", title: "Team Standup", type: "meeting", time: "In 30 min", participants: 8 },
    { id: "2", title: "Design Review", type: "meeting", time: "2:00 PM", participants: 4 },
    { id: "3", title: "Sprint Planning", type: "meeting", time: "Tomorrow, 10:00 AM", participants: 12 },
    { id: "4", title: "Phase 1 Deadline", type: "deadline", time: "Jul 5, 2024" },
  ];

  const projectProgress = [
    { name: "Website Redesign", progress: 75, color: "bg-indigo-500" },
    { name: "Mobile App v2", progress: 45, color: "bg-emerald-500" },
    { name: "API Integration", progress: 90, color: "bg-amber-500" },
    { name: "Dashboard Analytics", progress: 30, color: "bg-rose-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] p-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-[var(--card)] rounded-lg mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-[var(--card)] rounded-2xl" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text)]">Dashboard</h1>
        <p className="text-[var(--muted)] mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Boards"
          value={stats?.totalBoards || 0}
          color="primary"
          trend={{ value: 12, isUp: true }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          }
        />
        <StatCard
          title="Active Tasks"
          value={stats?.totalCards || 0}
          color="success"
          trend={{ value: 8, isUp: true }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
        />
        <StatCard
          title="Files Stored"
          value={stats?.totalFiles || 0}
          color="warning"
          trend={{ value: 3, isUp: false }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Notifications"
          value={stats?.totalNotifications || 0}
          color="error"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">Project Progress</h2>
              <Link href="/projects" className="text-sm text-[var(--primary)] hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {projectProgress.map((project, i) => (
                <div key={i} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[var(--text-secondary)]">{project.name}</span>
                    <span className="text-sm font-medium text-[var(--text)]">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-[var(--bg)] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${project.color} rounded-full transition-all duration-500 animate-slide-up`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">Recent Activity</h2>
              <Link href="/activity" className="text-sm text-[var(--primary)] hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 group hover:bg-[var(--card-hover)] -mx-2 px-2 py-2 rounded-lg transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {activity.user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text)]">
                      <span className="font-medium">{activity.user.name}</span>
                      <span className="text-[var(--muted)]"> {activity.title}</span>
                    </p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{activity.time}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-[var(--primary)]/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[var(--text)] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/projects" className="flex flex-col items-center gap-2 p-4 bg-[var(--card)] hover:bg-[var(--card-hover)] rounded-xl border border-[var(--border)] transition-colors">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs font-medium">New Project</span>
              </Link>
              <Link href="/tasks" className="flex flex-col items-center gap-2 p-4 bg-[var(--card)] hover:bg-[var(--card-hover)] rounded-xl border border-[var(--border)] transition-colors">
                <svg className="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-xs font-medium">New Task</span>
              </Link>
              <Link href="/meetings" className="flex flex-col items-center gap-2 p-4 bg-[var(--card)] hover:bg-[var(--card-hover)] rounded-xl border border-[var(--border)] transition-colors">
                <svg className="w-5 h-5 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium">New Meeting</span>
              </Link>
              <Link href="/files" className="flex flex-col items-center gap-2 p-4 bg-[var(--card)] hover:bg-[var(--card-hover)] rounded-xl border border-[var(--border)] transition-colors">
                <svg className="w-5 h-5 text-[var(--error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-xs font-medium">Upload File</span>
              </Link>
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">Upcoming</h2>
              <Link href="/calendar" className="text-sm text-[var(--primary)] hover:underline">Calendar</Link>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 bg-[var(--bg)] hover:bg-[var(--card-hover)] rounded-xl transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    event.type === "meeting" ? "bg-[var(--primary-muted)] text-[var(--primary)]" :
                    event.type === "deadline" ? "bg-[var(--error-muted)] text-[var(--error)]" :
                    "bg-[var(--success-muted)] text-[var(--success)]"
                  }`}>
                    {event.type === "meeting" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                    {event.type === "deadline" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {event.type === "event" && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text)] truncate">{event.title}</p>
                    <p className="text-xs text-[var(--muted)]">{event.time}</p>
                  </div>
                  {event.participants && (
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-[var(--bg)] flex items-center justify-center text-xs text-white">
                        {event.participants}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[var(--text)]">Team Online</h2>
              <span className="text-xs px-2 py-1 bg-[var(--success-muted)] text-[var(--success)] rounded-full">5 online</span>
            </div>
            <div className="space-y-3">
              {[
                { name: "Sarah Chen", role: "Designer", avatar: "SC" },
                { name: "Mike Ross", role: "Developer", avatar: "MR" },
                { name: "Emma Wilson", role: "Product", avatar: "EW" },
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      {member.avatar}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--success)] border-2 border-[var(--card)] rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text)]">{member.name}</p>
                    <p className="text-xs text-[var(--muted)]">{member.role}</p>
                  </div>
                  <button className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
