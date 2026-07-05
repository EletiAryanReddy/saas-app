"use client";

export default function NotificationBell({
  count = 3,
}: {
  count?: number;
}) {
  return (
    <button className="relative rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-[var(--text)] hover:bg-[var(--card-hover)]">
      🔔

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
          {count}
        </span>
      )}
    </button>
  );
}