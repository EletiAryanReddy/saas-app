"use client";

import { useState } from "react";

export default function InviteMember({
  onInvite,
}: any) {

  const [userId,
  setUserId] =
  useState("");

  return (
    <div className="mb-4">

      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) =>
          setUserId(
            e.target.value
          )
        }
        className="border p-2"
      />

      <button
        onClick={() =>
          onInvite(userId)
        }
        className="ml-2 bg-blue-500 text-white px-3 py-2"
      >
        Invite
      </button>

    </div>
  );
}