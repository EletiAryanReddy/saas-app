"use client";

import { useState } from "react";

export default function ProfilePage() {
  const user = {
    name: "Aryan Reddy",
    role: "Administrator",
    workspace: "Team Workspace",
    plan: "Pro Plan",
    email: "aryanreddy@example.com",
    joined: "Feb 2026",
    tasksCompleted: 127,
    projectsManaged: 8,
  };

  const [editing, setEditing] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Profile</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Manage your personal information</p>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 h-10 px-4 border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--card-hover)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative px-6 pb-6">
            <div className="flex items-end gap-6 -mt-12">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-[var(--card)] flex items-center justify-center text-white text-3xl font-bold">
                AR
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-[var(--text)]">{user.name}</h2>
                  <span className="px-2.5 py-1 bg-[var(--primary-muted)] text-[var(--primary)] text-xs font-medium rounded-full">
                    {user.plan}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)] mt-1">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <StatCard title="Tasks Completed" value={user.tasksCompleted} icon="task" />
          <StatCard title="Projects Managed" value={user.projectsManaged} icon="project" />
          <StatCard title="Member Since" value={user.joined} icon="calendar" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--text)] mb-4">Personal Information</h3>
            <div className="space-y-4">
              <InfoRow label="Full Name" value={user.name} editing={editing} />
              <InfoRow label="Email" value={user.email} editing={editing} />
              <InfoRow label="Role" value={user.role} editing={editing} />
              <InfoRow label="Workspace" value={user.workspace} editing={editing} />
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
            <h3 className="font-semibold text-[var(--text)] mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "Completed task", target: "API Integration", time: "2 hours ago" },
                { action: "Created project", target: "Mobile App v2", time: "5 hours ago" },
                { action: "Joined meeting", target: "Team Standup", time: "1 day ago" },
                { action: "Uploaded file", target: "presentation.pdf", time: "2 days ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--text)]">
                      <span className="text-[var(--muted)]">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-[var(--muted)]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: string }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--primary-muted)] flex items-center justify-center">
          {icon === "task" && (
            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          )}
          {icon === "project" && (
            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          )}
          {icon === "calendar" && (
            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">{title}</p>
          <p className="text-lg font-semibold text-[var(--text)]">{value}</p>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, editing }: { label: string; value: string; editing: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      {editing ? (
        <input
          type="text"
          defaultValue={value}
          className="h-9 px-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors text-right"
        />
      ) : (
        <span className="text-sm font-medium text-[var(--text)]">{value}</span>
      )}
    </div>
  );
}
