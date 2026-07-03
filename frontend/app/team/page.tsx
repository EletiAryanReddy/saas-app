"use client";

import { useEffect } from "react";
import InviteMember from "@/components/team/InviteMember";
import MemberCard from "@/components/team/MemberCard";
import { createMember, getMembers, updateRole } from "@/services/api/member.service";
import { useMemberStore } from "@/store/member.store";

export default function TeamPage() {
  const workspaceId = "6a2c2c86bd54aa6fdf34690a";
  const { members, setMembers } = useMemberStore();

  const loadMembers = async () => {
    try {
      const data = await getMembers(workspaceId);
      setMembers(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const invite = async (userId: string) => {
    await createMember({ workspaceId, userId, role: "Member" });
    loadMembers();
  };

  const changeRole = async (memberId: string, role: string) => {
    await updateRole(memberId, role);
    loadMembers();
  };

  const adminCount = members.filter((m: any) => m.role === "Admin").length;
  const memberCount = members.filter((m: any) => m.role === "Member").length;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Team</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Manage your workspace members</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--muted)]">{members.length} members</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-xs text-[var(--muted)] mb-1">Total Members</p>
            <p className="text-2xl font-bold text-[var(--text)]">{members.length}</p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-xs text-[var(--muted)] mb-1">Administrators</p>
            <p className="text-2xl font-bold text-[var(--text)]">{adminCount}</p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-xs text-[var(--muted)] mb-1">Members</p>
            <p className="text-2xl font-bold text-[var(--text)]">{memberCount}</p>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <p className="text-xs text-[var(--muted)] mb-1">Seats Available</p>
            <p className="text-2xl font-bold text-[var(--text)]">{Math.max(0, 10 - members.length)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <InviteMember onInvite={invite} />

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4">
            <h2 className="font-semibold text-[var(--text)] mb-4">Team Members</h2>
            <div className="space-y-3">
              {members.length === 0 ? (
                <div className="text-center py-8 text-[var(--muted)]">No members found</div>
              ) : (
                members.map((member: any) => (
                  <MemberCard key={member._id} member={member} onRoleChange={changeRole} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
