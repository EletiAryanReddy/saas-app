"use client";

interface ActivityStatsProps {
  stats: {
    totalActivities?: number;
    today?: number;
    thisWeek?: number;
    byType?: Record<string, number>;
  };
}

export default function ActivityStats({ stats }: ActivityStatsProps) {
  const statItems = [
    { label: "Total Activities", value: stats?.totalActivities || 0, icon: "activity", color: "bg-[var(--primary-muted)] text-[var(--primary)]" },
    { label: "Today", value: stats?.today || 0, icon: "today", color: "bg-[var(--success-muted)] text-[var(--success)]" },
    { label: "This Week", value: stats?.thisWeek || 0, icon: "week", color: "bg-[var(--warning-muted)] text-[var(--warning)]" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {statItems.map((stat) => (
        <div key={stat.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
              {stat.icon === "activity" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {stat.icon === "today" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {stat.icon === "week" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">{stat.label}</p>
              <p className="text-2xl font-bold text-[var(--text)]">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
