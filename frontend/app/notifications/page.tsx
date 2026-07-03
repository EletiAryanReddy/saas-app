"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "@/services/api/notification.service";
import NotificationList from "@/components/notification/NotificationList";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications("USER_ID");
      setNotifications(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => !n.read);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Notifications</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Stay updated with your activity</p>
            </div>
            {unreadCount > 0 && (
              <button className="text-sm text-[var(--primary)] hover:underline">
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === "all" ? "bg-[var(--primary)] text-white" : "text-[var(--text-secondary)]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                filter === "unread" ? "bg-[var(--primary)] text-white" : "text-[var(--text-secondary)]"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === "unread" ? "bg-white/20" : "bg-[var(--primary-muted)] text-[var(--primary)]"}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          <div className="flex-1" />
          <select className="h-10 px-4 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text-secondary)] outline-none">
            <option>All types</option>
            <option>Task</option>
            <option>Comment</option>
            <option>Meeting</option>
            <option>Mention</option>
          </select>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-[var(--bg)] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <NotificationList notifications={filteredNotifications} />
          )}
        </div>
      </div>
    </div>
  );
}
