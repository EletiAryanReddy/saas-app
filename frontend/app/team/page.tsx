"use client";

import {
  useEffect,
} from "react";

import InviteMember
from "@/components/team/InviteMember";

import MemberCard
from "@/components/team/MemberCard";

import {
  createMember,
  getMembers,
  updateRole,
} from "@/services/api/member.service";

import {
  useMemberStore,
} from "@/store/member.store";

export default function TeamPage() {

  const workspaceId =
    "6a2c2c86bd54aa6fdf34690a";

  const {
    members,
    setMembers,
  } = useMemberStore();

  const loadMembers =
  async () => {

    const data =
      await getMembers(
        workspaceId
      );

    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const invite =
  async (
    userId: string
  ) => {

    await createMember({
      workspaceId,
      userId,
      role: "Member",
    });

    loadMembers();
  };

  const changeRole =
  async (
    memberId: string,
    role: string
  ) => {

    await updateRole(
      memberId,
      role
    );

    loadMembers();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Team Members
      </h1>

      <InviteMember
        onInvite={invite}
      />

      {members.map(
        (member: any) => (
          <MemberCard
            key={member._id}
            member={member}
            onRoleChange={
              changeRole
            }
          />
        )
      )}

    </div>
  );
}