"use client";

interface Activity {
  _id: string;
  type: string;
  action: string;
  user?: { name: string; avatar: string };
  target?: string;
  createdAt: string;
}

export default function ActivityTimeline({ activities = [] }: { activities?: Activity[] }) {
  if (!activities.length) {
    return (
      <div className="flex flex-col items-center py-12">
        <div className="w-12 h-12 rounded-full bg-[var(--bg)] flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[var(--muted)]">No recent activity</p>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "TASK":
        return "bg-[var(--success-muted)] text-[var(--success)]";
      case "PROJECT":
        return "bg-[var(--primary-muted)] text-[var(--primary)]";
      case "MEETING":
        return "bg-[var(--warning-muted)] text-[var(--warning)]";
      case "FILE":
        return "bg-[var(--error-muted)] text-[var(--error)]";
      case "COMMENT":
        return "bg-blue-500/15 text-blue-500";
      default:
        return "bg-[var(--card-hover)] text-[var(--muted)]";
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, i) => (
        <div key={activity._id} className="relative flex gap-4">
          {i < activities.length - 1 && (
            <div className="absolute left-5 top-12 w-px h-full bg-[var(--border)]" />
          )}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getActivityIcon(activity.type)}`}>
            {activity.type === "TASK" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {activity.type === "PROJECT" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            )}
            {activity.type === "MEETING" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            {activity.type === "FILE" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
            {activity.type === "COMMENT" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
            {!["TASK", "PROJECT", "MEETING", "FILE", "COMMENT"].includes(activity.type) && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-[var(--text)]">
                <span className="font-medium">{activity.user?.name || "Someone"}</span>{" "}
                <span className="text-[var(--muted)]">{activity.action}</span>{" "}
                {activity.target && <span className="font-medium">{activity.target}</span>}
              </p>
              <span className="text-xs text-[var(--muted)] shrink-0">{formatDate(activity.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
