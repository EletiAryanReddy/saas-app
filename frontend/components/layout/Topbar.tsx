"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/auth/login");
  };

  return (
    <header
      className="
      sticky
      top-0
      z-30
      h-20
      bg-[var(--card)]
      border-b
      border-[var(--border)]
      backdrop-blur-lg
      flex
      items-center
      justify-between
      px-8
      "
    >
      {/* Search */}

      <input
        placeholder="Search projects, tasks, files..."
        className="
        w-[420px]
        rounded-xl
        border
        border-[var(--border)]
        bg-[var(--bg)]
        px-4
        py-3
        text-[var(--text)]
        placeholder:text-[var(--muted)]
        outline-none
        focus:ring-2
        focus:ring-[var(--primary)]
        "
      />

      {/* Actions */}

      <div className="flex items-center gap-3">

        <button
          className="
          rounded-xl
          bg-[var(--primary)]
          px-5
          py-2.5
          text-white
          font-medium
          hover:opacity-90
          transition
          "
        >
          + Create
        </button>

        <button
          className="
          rounded-xl
          border
          border-[var(--border)]
          bg-[var(--bg)]
          px-4
          py-2.5
          text-[var(--text)]
          hover:bg-[var(--card-hover)]
          transition
          "
        >
          🔔
        </button>

        <button
          onClick={logout}
          className="
          rounded-xl
          bg-red-600
          px-5
          py-2.5
          text-white
          hover:bg-red-700
          transition
          "
        >
          Logout
        </button>

      </div>
    </header>
  );
}