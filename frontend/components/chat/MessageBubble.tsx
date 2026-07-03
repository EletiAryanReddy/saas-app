"use client";

export default function MessageBubble({ message, isOwn }: { message: any; isOwn?: boolean }) {
  const time = new Date(message.createdAt || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%]">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl rounded-br-md px-4 py-2.5 shadow-sm">
            <p className="text-sm leading-relaxed">{message.message}</p>
          </div>
          <p className="text-xs text-[var(--muted)] mt-1 text-right">{time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
        {message.senderId?.name?.charAt(0) || message.senderId?._id?.charAt(0) || "?"}
      </div>
      <div className="max-w-[70%]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-[var(--text)]">{message.senderId?.name || "User"}</span>
          <span className="text-xs text-[var(--muted)]">{time}</span>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl rounded-tl-md px-4 py-2.5">
          <p className="text-sm text-[var(--text)] leading-relaxed">{message.message}</p>
        </div>
      </div>
    </div>
  );
}
