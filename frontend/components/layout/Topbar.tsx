"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Topbar() {
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
      if (createRef.current && !createRef.current.contains(event.target as Node)) {
        setCreateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/auth/login");
  };

  const notifications = [
    { id: 1, title: "New comment on task", desc: "Sarah commented on 'API Integration'", time: "2 min ago", unread: true },
    { id: 2, title: "Meeting reminder", desc: "Team standup in 30 minutes", time: "5 min ago", unread: true },
    { id: 3, title: "Task completed", desc: "Mike completed 'Database schema'", time: "1 hour ago", unread: false },
  ];

  const createOptions = [
    { name: "New Project", href: "/projects", icon: "📁" },
    { name: "New Task", href: "/tasks", icon: "✓" },
    { name: "New Meeting", href: "/meetings", icon: "🎥" },
    { name: "Upload File", href: "/files", icon: "📎" },
    { name: "New Whiteboard", href: "/whiteboard", icon: "🎨" },
  ];

  return (
    <header className="sticky top-0 z-40 h-16 bg-[var(--card)]/80 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between px-6">
      {/* Search */}
      <div className={`relative flex items-center transition-all duration-300 ${searchFocused ? "w-[500px]" : "w-[400px]"}`}>
        <svg className="absolute left-4 w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          placeholder="Search projects, tasks, files, people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full h-11 pl-12 pr-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-muted)] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 p-1 hover:bg-[var(--card-hover)] rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Create Button */}
        <div ref={createRef} className="relative">
          <button
            onClick={() => setCreateOpen(!createOpen)}
            className="flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create
          </button>
          {createOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-2 animate-fade-in">
              {createOptions.map((opt) => (
                <Link
                  key={opt.name}
                  href={opt.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                  onClick={() => setCreateOpen(false)}
                >
                  <span className="text-lg">{opt.icon}</span>
                  <span className="text-sm">{opt.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--card-hover)] transition-colors"
          >
            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
          </button>
          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl animate-fade-in">
              <div className="p-4 border-b border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  <span className="text-xs text-[var(--primary)] cursor-pointer hover:underline">Mark all read</span>
                </div>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--card-hover)] cursor-pointer transition-colors ${
                      n.unread ? "bg-[var(--primary-muted)]/30" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${n.unread ? "bg-[var(--primary)]" : "bg-transparent"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-[var(--muted)] mt-0.5 truncate">{n.desc}</p>
                        <p className="text-xs text-[var(--muted)] mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-[var(--border)]">
                <Link href="/notifications" className="block text-center text-sm text-[var(--primary)] hover:underline">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--card-hover)] transition-colors">
          <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-semibold px-1">
            3
          </span>
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 h-10 px-3 rounded-xl hover:bg-[var(--card-hover)] transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              AR
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium leading-tight">Aryan Reddy</p>
              <p className="text-xs text-[var(--muted)] leading-tight">Administrator</p>
            </div>
            <svg className={`w-4 h-4 text-[var(--muted)] transition-transform ${profileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl animate-fade-in">
              <div className="p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    AR
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Aryan Reddy</p>
                    <p className="text-xs text-[var(--muted)]">aryan@example.com</p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--card-hover)] transition-colors">
                  <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm">Your Profile</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--card-hover)] transition-colors">
                  <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Settings</span>
                </Link>
                <div className="my-1 border-t border-[var(--border)]" />
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-sm">Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
