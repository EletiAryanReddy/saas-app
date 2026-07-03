"use client";

import { useEffect } from "react";
import ActivityTimeline from "@/components/activity/ActivityTimeline";
import ActivityStats from "@/components/activity/ActivityStats";
import { getWorkspaceActivities, getActivityStats } from "@/services/api/activity.service";
import { useActivityStore } from "@/store/activity.store";

export default function ActivityPage() {
  const { activities, stats, setActivities, setStats } = useActivityStore();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const activityRes = await getWorkspaceActivities("6a2c2c86bd54aa6fdf34690a");
    setActivities(activityRes.data || []);
    const statsRes = await getActivityStats("6a2c2c86bd54aa6fdf34690a");
    setStats(statsRes.data || {});
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Activity</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Track what&apos;s happening in your workspace</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="h-10 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-secondary)] outline-none">
                <option>All Activity</option>
                <option>Tasks</option>
                <option>Projects</option>
                <option>Meetings</option>
                <option>Files</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <ActivityStats stats={stats} />

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h2 className="font-semibold text-[var(--text)] mb-6">Recent Activity</h2>
          <ActivityTimeline activities={activities} />
        </div>
      </div>
    </div>
  );
}
