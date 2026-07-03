"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div
        className="transition-all duration-300"
        style={{ marginLeft: collapsed ? 80 : 256 }}
      >
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
