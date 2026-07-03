"use client";

import RoleSelector
from "./RoleSelector";

export default function MemberCard({
  member,
  onRoleChange,
}: any) {

  return (
    <div className="border p-4 rounded mb-3">

      <p>
        {member.userId?._id}
      </p>

      <RoleSelector
        role={member.role}
        onChange={(role) =>
          onRoleChange(
            member._id,
            role
          )
        }
      />

    </div>
  );
}