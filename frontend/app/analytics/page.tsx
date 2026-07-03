"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function StatCard({ title, value, icon, color, trend }: { title: string; value: number; icon: React.ReactNode; color: string; trend?: { value: number; isUp: boolean } }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--muted)]">{title}</p>
          <p className="text-3xl font-bold text-[var(--text)] mt-1">{animatedValue.toLocaleString()}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trend.isUp ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
              {trend.isUp ? "+" : ""}{trend.value}% from last week
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-12">
      {data.map((val, i) => (
        <div
          key={i}
          className={`${color} rounded-sm transition-all`}
          style={{ width: 20, height: (val / max) * 48 }}
        />
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const workspaceId = "6a2c2c86bd54aa6fdf34690a";
  const [workspaceAnalytics, setWorkspaceAnalytics] = useState<any>(null);
  const [taskAnalytics, setTaskAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const workspaceRes = await fetch(`${API}/analytics/workspace/${workspaceId}`);
        const taskRes = await fetch(`${API}/analytics/tasks/${workspaceId}`);
        setWorkspaceAnalytics(await workspaceRes.json());
        setTaskAnalytics(await taskRes.json());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  const chartData = [30, 45, 28, 60, 42, 55, 48];
  const donutData = taskAnalytics ? [taskAnalytics.todo || 0, taskAnalytics.inProgress || 0, taskAnalytics.done || 0] : [0, 0, 0];
  const totalTasks = donutData.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Analytics</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Track your team&apos;s performance and activity</p>
            </div>
            <div className="flex items-center gap-2 bg-[var(--bg)] rounded-xl p-1">
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white">Week</button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-[var(--text-secondary)]">Month</button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg text-[var(--text-secondary)]">Year</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-[var(--card)] rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Members"
                value={workspaceAnalytics?.totalMembers || 0}
                color="bg-[var(--primary-muted)]"
                trend={{ value: 12, isUp: true }}
                icon={<svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
              />
              <StatCard
                title="Files Uploaded"
                value={workspaceAnalytics?.uploadedFiles || 0}
                color="bg-[var(--success-muted)]"
                trend={{ value: 8, isUp: true }}
                icon={<svg className="w-6 h-6 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>}
              />
              <StatCard
                title="Meetings Held"
                value={workspaceAnalytics?.totalMeetings || 0}
                color="bg-[var(--warning-muted)]"
                icon={<svg className="w-6 h-6 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
              />
              <StatCard
                title="Messages Sent"
                value={workspaceAnalytics?.totalMessages || 0}
                color="bg-[var(--error-muted)]"
                trend={{ value: 5, isUp: true }}
                icon={<svg className="w-6 h-6 text-[var(--error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="font-semibold text-[var(--text)] mb-4">Task Distribution</h2>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {(() => {
                        let cumulativePercent = 0;
                        const colors = ["#f59e0b", "#6366f1", "#22c55e"];
                        return donutData.map((val, i) => {
                          const percent = totalTasks > 0 ? (val / totalTasks) * 100 : 33.33;
                          const strokeDasharray = `${percent} ${100 - percent}`;
                          const strokeDashoffset = -cumulativePercent;
                          cumulativePercent += percent;
                          return (
                            <circle
                              key={i}
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={colors[i]}
                              strokeWidth="20"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-1000"
                            />
                          );
                        });
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-[var(--text)]">{totalTasks}</span>
                      <span className="text-xs text-[var(--muted)]">Total Tasks</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-sm text-[var(--text-secondary)]">Todo</span>
                    </div>
                    <span className="font-medium text-[var(--text)]">{taskAnalytics?.todo || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-500" />
                      <span className="text-sm text-[var(--text-secondary)]">In Progress</span>
                    </div>
                    <span className="font-medium text-[var(--text)]">{taskAnalytics?.inProgress || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-sm text-[var(--text-secondary)]">Done</span>
                    </div>
                    <span className="font-medium text-[var(--text)]">{taskAnalytics?.done || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="font-semibold text-[var(--text)] mb-4">Weekly Activity</h2>
                <MiniChart data={chartData} color="bg-[var(--primary)]" />
                <div className="flex justify-between mt-4 text-xs text-[var(--muted)]">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--border)]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Total This Week</span>
                    <span className="font-semibold text-[var(--text)]">308 actions</span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="font-semibold text-[var(--text)] mb-4">Top Contributors</h2>
                <div className="space-y-4">
                  {[
                    { name: "Aryan Reddy", tasks: 24, avatar: "AR" },
                    { name: "Sarah Chen", tasks: 18, avatar: "SC" },
                    { name: "Mike Ross", tasks: 15, avatar: "MR" },
                    { name: "Emma Wilson", tasks: 12, avatar: "EW" },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--text)]">{user.name}</p>
                        <p className="text-xs text-[var(--muted)]">{user.tasks} tasks completed</p>
                      </div>
                      <div className="w-16 h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: `${(user.tasks / 24) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
