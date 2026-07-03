"use client";

export default function OnlineUsers() {
  const users = [
    { id: "1", name: "Aryan Reddy", role: "Administrator", online: true, avatar: "AR" },
    { id: "2", name: "Sarah Chen", role: "Designer", online: true, avatar: "SC" },
    { id: "3", name: "Mike Ross", role: "Developer", online: true, avatar: "MR" },
    { id: "4", name: "Emma Wilson", role: "Product Manager", online: true, avatar: "EW" },
    { id: "5", name: "John Doe", role: "Developer", online: false, avatar: "JD" },
    { id: "6", name: "Lisa Ray", role: "Designer", online: false, avatar: "LR" },
  ];

  const onlineUsers = users.filter((u) => u.online);
  const offlineUsers = users.filter((u) => !u.online);

  return (
    <div className="w-64 bg-[var(--card)] border-l border-[var(--border)] flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text)]">Members</h3>
          <span className="text-xs px-2 py-1 bg-[var(--success-muted)] text-[var(--success)] rounded-full">
            {onlineUsers.length} online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-3">Online</p>
          <div className="space-y-2">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors cursor-pointer">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user.avatar}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--success)] border-2 border-[var(--card)] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text)] truncate">{user.name}</p>
                  <p className="text-xs text-[var(--muted)] truncate">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider mb-3">Offline</p>
          <div className="space-y-2">
            {offlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors cursor-pointer opacity-50">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-[var(--border)] flex items-center justify-center text-[var(--muted)] text-sm font-semibold">
                    {user.avatar}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[var(--muted)] border-2 border-[var(--card)] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text)] truncate">{user.name}</p>
                  <p className="text-xs text-[var(--muted)] truncate">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
