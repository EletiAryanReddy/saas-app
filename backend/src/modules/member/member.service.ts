import Member from "./member.model";

export const createMember = async (
  data: any
) => {
  return Member.create(data);
};

export const getWorkspaceMembers =
async (workspaceId: string) => {

  return Member.find({
    workspaceId,
  }).populate("userId");
};

export const updateMemberRole =
async (
  memberId: string,
  role: string
) => {

  return Member.findByIdAndUpdate(
    memberId,
    { role },
    { new: true }
  );
};

export const deleteMember =
async (memberId: string) => {

  return Member.findByIdAndDelete(
    memberId
  );
};