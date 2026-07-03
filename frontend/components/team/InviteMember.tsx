"use client";

import { useState } from "react";

export default function InviteMember({ onInvite }: { onInvite: (userId: string) => void }) {
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleInvite = () => {
    if (userId.trim()) {
      onInvite(userId.trim());
      setUserId("");
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full h-12 border-2 border-dashed border-[var(--border)] rounded-xl text-sm text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Invite new member
      </button>
    );
  }

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
      <h3 className="font-medium text-[var(--text)] mb-3">Invite Team Member</h3>
      <div className="flex gap-3">
        <input
          placeholder="Enter email or user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleInvite()}
          className="flex-1 h-10 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
        />
        <button
          onClick={handleInvite}
          disabled={!userId.trim()}
          className="h-10 px-5 bg-[var(--primary)] text-white text-sm font-medium rounded-xl hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send Invite
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="h-10 px-4 border border-[var(--border)] text-sm text-[var(--text-secondary)] rounded-xl hover:bg-[var(--card-hover)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
