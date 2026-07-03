"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const nav = [
  ["Dashboard", "▦", "/dashboard"],
  ["Projects", "▣", "/projects"],
  ["Subscription", "💳", "/billing"],
  ["Admin", "🛡️", "/admin"],
  ["Board", "▥", "/board"],
  ["Tasks", "✓", "/tasks"],
  ["Calendar", "🗓️", "/calendar"],
  ["Chat", "◌", "/chat"],
  ["Meetings", "◎", "/meetings"],
  ["Files", "▤", "/files"],
  ["Whiteboard", "✎", "/whiteboard"],
  ["Reports", "▣", "/reports"],
  ["Analytics", "✦", "/analytics"],
];

export default function HomePage() {
  const router = useRouter();
const [profileOpen, setProfileOpen] = useState(false);

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  router.push("/auth/login");
};
  return (
    <main className="min-h-screen bg-[#070b16] text-white flex font-sans">
      <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#08111f] border-r border-white/10 p-5">
        <h1 className="text-3xl font-bold mb-8">
          SaaS<span className="text-violet-400">Pro</span>
        </h1>

        <div className="bg-[#111b2e] border border-white/10 rounded-2xl p-4 mb-6">
          <p className="font-semibold">Aryan Workspace</p>
          <p className="text-violet-400 text-sm">Pro Plan</p>
        </div>

        <nav className="space-y-2">
          {nav.map(([name, icon, href]) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                name === "Dashboard"
                  ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                  : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <span>{icon}</span>
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <section className="ml-[280px] w-[calc(100%-280px)]">
        <header className="h-20 border-b border-white/10 bg-[#070b16]/90 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-20">
          <input
            placeholder="Search anything..."
            className="w-[420px] bg-[#101827] border border-white/10 rounded-xl px-5 py-3 outline-none text-sm text-white"
          />

          <div className="flex items-center gap-5">
            <button className="bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 rounded-xl">
              + Create
            </button>
            <span>🔔</span>
            <span>💬</span>

            <div className="relative">
  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-xl"
  >
    <div className="w-11 h-11 rounded-full bg-violet-600 flex items-center justify-center font-bold">
      AR
    </div>

    <div className="text-left">
      <p className="font-semibold">Aryan Reddy</p>
      <p className="text-slate-400 text-sm">
        Administrator
      </p>
    </div>

    <span className="text-slate-400">⌄</span>
  </button>

  {profileOpen && (
    <div className="absolute right-0 mt-3 w-64 bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl p-3 z-50">
      <div className="px-3 py-3 border-b border-white/10">
        <p className="font-semibold">Aryan Reddy</p>
        <p className="text-sm text-slate-400">
          aryan@example.com
        </p>
      </div>

      <Link
        href="/profile"
        className="block px-3 py-3 rounded-xl hover:bg-white/10"
      >
        👤 Profile
      </Link>

      <Link
        href="/settings"
        className="block px-3 py-3 rounded-xl hover:bg-white/10"
      >
        ⚙️ Settings
      </Link>

      <button
        onClick={logout}
        className="w-full text-left px-3 py-3 rounded-xl hover:bg-red-600/20 text-red-400"
      >
        🚪 Logout
      </button>
    </div>
  )}
</div>
          </div>
        </header>

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            Good Morning, Aryan! 👋
          </h1>
          <p className="text-slate-400 mt-2 mb-8">
            Here&apos;s what&apos;s happening with your workspace today.
          </p>

          <div className="grid grid-cols-4 gap-6 mb-6">
            <Stat title="Total Projects" value="24" sub="+12% from last week" icon="📁" />
            <Stat title="Tasks Completed" value="156" sub="+18% from last week" icon="✅" />
            <Stat title="Team Members" value="18" sub="+4% from last week" icon="👥" />
            <Stat title="Hours Tracked" value="287h" sub="+8% from last week" icon="⏱️" />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7 card">
              <h2 className="text-xl font-semibold mb-6">Project Progress</h2>
              <FakeLineChart />
            </div>

            <div className="col-span-3 card">
              <h2 className="text-xl font-semibold mb-6">Tasks Overview</h2>
              <div className="w-44 h-44 mx-auto rounded-full border-[28px] border-blue-500 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold">156</h3>
                  <p className="text-slate-400">Total</p>
                </div>
              </div>
            </div>

            <div className="col-span-2 card">
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className={`p-2 rounded-lg ${i === 21 ? "bg-violet-600" : "bg-white/5"}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-4 card">
              <h2 className="text-xl font-semibold mb-5">Recent Projects</h2>
              {["Website Redesign", "Mobile App Development", "Marketing Campaign", "E-commerce Platform"].map((p, i) => (
                <div key={p} className="flex justify-between py-4 border-b border-white/10">
                  <div>
                    <p className="font-semibold">{p}</p>
                    <p className="text-slate-400 text-sm">Updated recently</p>
                  </div>
                  <p>{[75, 48, 62, 30][i]}%</p>
                </div>
              ))}
            </div>

            <div className="col-span-5 card">
              <h2 className="text-xl font-semibold mb-5">Team Activity</h2>
              {["Sarah completed a task", "Mike uploaded project file", "Emma created a new task", "Alex commented on API update"].map((a, i) => (
                <div key={a} className="flex justify-between py-4 border-b border-white/10">
                  <span>{a}</span>
                  <span className="text-slate-400">{i + 2} min ago</span>
                </div>
              ))}
            </div>

            <div className="col-span-3 card">
              <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {["New Project", "Create Task", "Upload File", "Meeting"].map((a) => (
                  <button key={a} className="bg-[#111b2e] hover:bg-violet-600 p-4 rounded-xl">
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .card {
          background: linear-gradient(180deg, #101827, #0b1220);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 22px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.35);
        }
      `}</style>
    </main>
  );
}

function Stat({ title, value, sub, icon }: any) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
          <p className="text-green-400 mt-2 text-sm">{sub}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function FakeLineChart() {
  return (
    <div className="h-72 flex items-end gap-6 border-b border-white/10">
      {[35, 52, 58, 72, 48, 61, 77].map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-3">
          <div
            className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 to-blue-400"
            style={{ height: `${h * 2}px` }}
          />
          <span className="text-slate-400 text-sm">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
          </span>
        </div>
      ))}
    </div>
  );
}