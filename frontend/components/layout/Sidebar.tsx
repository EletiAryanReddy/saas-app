"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["📊", "Dashboard", "/dashboard"],
  ["📁", "Projects", "/projects"],
  ["💳", "Subscription", "/billing"],
  ["🛡️", "Admin", "/admin"],
  ["✅", "Tasks", "/tasks"],
  ["🧩", "Board", "/board"],
  ["📅", "Calendar", "/calendar"],
  ["💬", "Chat", "/chat"],
  ["🎥", "Meetings", "/meetings"],
  ["📎", "Files", "/files"],
  ["🧠", "Whiteboard", "/whiteboard"],
  ["📄", "Reports", "/reports"],
  ["📈", "Analytics", "/analytics"],
  ["⚙️", "Settings", "/settings"],
  ["⚡", "Activity", "/activity"],
  ["🔔", "Notifications", "/notifications"],
  ["📚", "Wiki", "/wiki"],
  ["🤖", "Automation", "/automation"],
  ["🖥️", "Monitoring", "/monitoring"],
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-72 bg-[var(--card)] border-r border-[var(--border)] text-[var(--text)] flex flex-col overflow-hidden">
      <div className="shrink-0 p-5 border-b border-[var(--border)]">
        <h1 className="text-2xl font-bold">
          SaaS<span className="text-[var(--primary)]">Pro</span>
        </h1>

        <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4">
          <p className="text-xs text-[var(--muted)]">Workspace</p>
          <p className="font-semibold">Aryan Workspace</p>
        </div>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-scroll px-4 py-4 space-y-1 scrollbar-thin">
        {links.map(([icon, name, href]) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--muted)] hover:bg-[var(--card-hover)] hover:text-[var(--text)]"
              }`}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}