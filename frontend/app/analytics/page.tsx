"use client";

import { useEffect, useState } from "react";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export default function AnalyticsPage() {
  const workspaceId =
    "6a2c2c86bd54aa6fdf34690a";

  const [workspaceAnalytics, setWorkspaceAnalytics] =
    useState<any>(null);

  const [taskAnalytics, setTaskAnalytics] =
    useState<any>(null);

  const loadAnalytics = async () => {
    try {
      const workspaceRes = await fetch(
        `${API}/analytics/workspace/${workspaceId}`
      );

      const taskRes = await fetch(
        `${API}/analytics/tasks/${workspaceId}`
      );

      setWorkspaceAnalytics(
        await workspaceRes.json()
      );

      setTaskAnalytics(
        await taskRes.json()
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card
          title="Members"
          value={
            workspaceAnalytics?.totalMembers || 0
          }
        />

        <Card
          title="Files"
          value={
            workspaceAnalytics?.uploadedFiles || 0
          }
        />

        <Card
          title="Meetings"
          value={
            workspaceAnalytics?.totalMeetings || 0
          }
        />

        <Card
          title="Events"
          value={
            workspaceAnalytics?.totalEvents || 0
          }
        />

        <Card
          title="Messages"
          value={
            workspaceAnalytics?.totalMessages || 0
          }
        />

        <Card
          title="Boards"
          value={
            workspaceAnalytics?.totalBoards || 0
          }
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Task Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <Card
          title="Todo"
          value={taskAnalytics?.todo || 0}
        />

        <Card
          title="In Progress"
          value={taskAnalytics?.inProgress || 0}
        />

        <Card
          title="Done"
          value={taskAnalytics?.done || 0}
        />
      </div>
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white p-5 rounded-lg shadow border">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}