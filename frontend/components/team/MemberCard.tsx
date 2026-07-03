"use client";

interface Member {
  _id: string;
  userId?: { _id: string; name: string; email: string };
  role: string;
  joinedAt: string;
}

export default function MemberCard({ member, onRoleChange }: { member: Member; onRoleChange: (memberId: string, role: string) => void }) {
  const name = member.userId?.name || "Unknown";
  const email = member.userId?.email || "";
  const avatar = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const statusColors: Record<string, string> = {
    Admin: "bg-[var(--primary-muted)] text-[var(--primary)]",
    Member: "bg-[var(--success-muted)] text-[var(--success)]",
    Guest: "bg-[var(--warning-muted)] text-[var(--warning)]",
  };

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--border-hover)] transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[var(--text)]">{name}</p>
          <p className="text-sm text-[var(--muted)] truncate">{email}</p>
        </div>
        <select
          value={member.role}
          onChange={(e) => onRoleChange(member._id, e.target.value)}
          className="h-9 px-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-secondary)] outline-none focus:border-[var(--primary)] transition-colors"
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
          <option value="Guest">Guest</option>
        </select>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[member.role] || statusColors.Member}`}>
          {member.role}
        </span>
      </div>
    </div>
  );
}
