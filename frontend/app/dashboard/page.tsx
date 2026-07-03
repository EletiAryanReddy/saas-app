"use client";

import { useEffect, useState } from "react";

import StatCard from
"@/components/dashboard/StatCard";

import {
  getDashboard,
} from "@/services/api/dashboard.service";

export default function DashboardPage() {

  const [stats, setStats] =
    useState<any>(null);

  const workspaceId =
    "6a2c2c86bd54aa6fdf34690a";

  useEffect(() => {

    const load = async () => {

      const data =
        await getDashboard(
          workspaceId
        );

      setStats(data);
    };

    load();

  }, []);

  if (!stats)
    return <p>Loading...</p>;

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <StatCard
          title="Boards"
          value={stats.totalBoards}
        />

        <StatCard
          title="Cards"
          value={stats.totalCards}
        />

        <StatCard
          title="Files"
          value={stats.totalFiles}
        />

        <StatCard
          title="Activities"
          value={stats.totalActivities}
        />

        <StatCard
          title="Notifications"
          value={stats.totalNotifications}
        />

      </div>

    </div>
  );
}