"use client";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  read: boolean;
}

export default function NotificationList({ notifications = [] }: { notifications?: Notification[] }) {
  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center py-20">
        <div className="w-16 h-16 rounded-full bg-[var(--bg)] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <p className="text-[var(--muted)]">No notifications</p>
        <p className="text-sm text-[var(--muted)] mt-1">You&apos;re all caught up!</p>
      </div>
    );
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "TASK":
        return (
          <div className="w-10 h-10 rounded-xl bg-[var(--success-muted)] flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
        );
      case "COMMENT":
        return (
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-muted)] flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case "MEETING":
        return (
          <div className="w-10 h-10 rounded-xl bg-[var(--warning-muted)] flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case "MENTION":
        return (
          <div className="w-10 h-10 rounded-xl bg-[var(--error-muted)] flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-[var(--card-hover)] flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      {notifications.map((item) => (
        <div
          key={item._id}
          className={`p-4 rounded-2xl border transition-colors cursor-pointer ${
            item.read
              ? "bg-[var(--card)] border-[var(--border)] hover:bg-[var(--card-hover)]"
              : "bg-[var(--primary-muted)]/30 border-[var(--primary)]/20 hover:bg-[var(--primary-muted)]/50"
          }`}
        >
          <div className="flex gap-4">
            {getNotificationIcon(item.type)}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-[var(--text)]">{item.title || "Notification"}</h3>
                  <p className="text-sm text-[var(--muted)] mt-1">{item.message || "No message"}</p>
                </div>
                {!item.read && <div className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0 mt-2" />}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-[var(--muted)]">
                  {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                </span>
                <span className="text-xs px-2 py-1 bg-[var(--bg)] rounded-lg text-[var(--muted)]">{item.type || "SYSTEM"}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
