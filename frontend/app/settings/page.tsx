"use client";

import { useState } from "react";
import ThemeToggle from "@/components/settings/ThemeToggle";

const tabs = [
  { id: "profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "appearance", label: "Appearance", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" },
  { id: "notifications", label: "Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  { id: "security", label: "Security", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { id: "workspace", label: "Workspace", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-[var(--text)]">Settings</h1>
          <p className="text-[var(--muted)] text-sm mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          <nav className="w-64 shrink-0">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[var(--primary-muted)] text-[var(--primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--card-hover)]"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tab.icon} />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-[var(--border)]">
                  <h2 className="font-semibold text-[var(--text)]">Profile Information</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">Update your personal details</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      AR
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors">
                        Change photo
                      </button>
                      <p className="text-xs text-[var(--muted)] mt-2">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="Aryan"
                        className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Reddy"
                        className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="aryan@example.com"
                      className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Bio</label>
                    <textarea
                      rows={3}
                      placeholder="Write a short bio..."
                      className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 p-6 border-t border-[var(--border)]">
                  <button className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--text)] mb-4">Theme</h2>
                  <ThemeToggle />
                </div>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--text)] mb-4">Accent Color</h2>
                  <div className="flex items-center gap-4">
                    {["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"].map((color) => (
                      <button
                        key={color}
                        className="w-10 h-10 rounded-xl transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--text)] mb-4">Display Density</h2>
                  <div className="flex items-center gap-2 bg-[var(--bg)] rounded-xl p-1 w-fit">
                    {["Compact", "Default", "Comfortable"].map((density, i) => (
                      <button
                        key={density}
                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                          i === 1 ? "bg-[var(--primary)] text-white" : "text-[var(--text-secondary)]"
                        }`}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl">
                <div className="p-6 border-b border-[var(--border)]">
                  <h2 className="font-semibold text-[var(--text)]">Notification Preferences</h2>
                  <p className="text-sm text-[var(--muted)] mt-1">Choose how you want to be notified</p>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {[
                    { title: "Email notifications", desc: "Receive updates via email" },
                    { title: "Push notifications", desc: "Get push alerts on your devices" },
                    { title: "Desktop notifications", desc: "Show alerts in browser" },
                    { title: "Task reminders", desc: "Get reminded about upcoming deadlines" },
                    { title: "Meeting reminders", desc: "Get reminded before meetings start" },
                    { title: "Weekly digest", desc: "Receive a weekly summary of your activity" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium text-[var(--text)]">{item.title}</p>
                        <p className="text-sm text-[var(--muted)]">{item.desc}</p>
                      </div>
                      <button
                        className={`w-12 h-7 rounded-full relative transition-colors ${i < 3 ? "bg-[var(--primary)]" : "bg-[var(--border)]"}`}
                      >
                        <span
                          className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${i < 3 ? "right-1" : "left-1"}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--text)] mb-4">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <button className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--text)] mb-4">Active Sessions</h2>
                  <div className="space-y-3">
                    {[
                      { device: "MacBook Pro - Chrome", location: "San Francisco, CA", current: true },
                      { device: "iPhone 15 - Safari", location: "San Francisco, CA", current: false },
                      { device: "Windows PC - Firefox", location: "New York, NY", current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-[var(--bg)] rounded-xl">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-[var(--text)]">{session.device}</p>
                            <p className="text-xs text-[var(--muted)]">{session.location}</p>
                          </div>
                        </div>
                        {session.current ? (
                          <span className="text-xs px-2 py-1 bg-[var(--success-muted)] text-[var(--success)] rounded-full">
                            Current
                          </span>
                        ) : (
                          <button className="text-xs px-3 py-1 text-[var(--error)] hover:bg-[var(--error-muted)] rounded-lg transition-colors">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-[var(--error-muted)]/30 border border-[var(--error)]/20 rounded-2xl">
                  <h3 className="font-semibold text-[var(--text)] mb-2">Danger Zone</h3>
                  <p className="text-sm text-[var(--muted)] mb-4">Once you delete your account, there is no going back.</p>
                  <button className="px-4 py-2 bg-[var(--error)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {activeTab === "workspace" && (
              <div className="space-y-6">
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--text)] mb-4">Workspace Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Workspace Name</label>
                      <input
                        type="text"
                        defaultValue="Team Workspace"
                        className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Workspace URL</label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--muted)]">team.app/</span>
                        <input
                          type="text"
                          defaultValue="team-workspace"
                          className="flex-1 h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
                  <h2 className="font-semibold text-[var(--text)] mb-4">Team Members</h2>
                  <div className="space-y-3">
                    {[
                      { name: "Aryan Reddy", email: "aryan@example.com", role: "Admin", avatar: "AR" },
                      { name: "Sarah Chen", email: "sarah@example.com", role: "Member", avatar: "SC" },
                      { name: "Mike Ross", email: "mike@example.com", role: "Member", avatar: "MR" },
                    ].map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[var(--bg)] rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--text)]">{member.name}</p>
                            <p className="text-xs text-[var(--muted)]">{member.email}</p>
                          </div>
                        </div>
                        <select className="h-8 px-3 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-secondary)] outline-none">
                          <option selected={member.role === "Admin"}>Admin</option>
                          <option selected={member.role === "Member"}>Member</option>
                          <option>Guest</option>
                        </select>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full h-11 border border-dashed border-[var(--border)] rounded-xl text-sm text-[var(--muted)] hover:bg-[var(--card-hover)] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Invite team member
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
