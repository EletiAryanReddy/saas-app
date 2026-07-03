import { create } from "zustand";

interface MemberStore {
  members: any[];
  setMembers: (
    members: any[]
  ) => void;
}

export const useMemberStore =
create<MemberStore>(
  (set) => ({
    members: [],

    setMembers:
    (members) =>
      set({
        members,
      }),
  })
);