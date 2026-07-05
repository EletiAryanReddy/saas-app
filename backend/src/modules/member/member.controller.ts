import {
  createMember,
  getWorkspaceMembers,
  updateMemberRole,
  deleteMember,
} from "./member.service";

export const createMemberController =
async (req: any, res: any) => {

  const member =
    await createMember(req.body);

  res.json(member);
};

export const getMembersController =
async (req: any, res: any) => {

  const members =
    await getWorkspaceMembers(
      String(req.params.workspaceId)
    );

  res.json(members);
};

export const updateRoleController =
async (req: any, res: any) => {

  const member =
    await updateMemberRole(
      String(req.params.memberId),
      req.body.role
    );

  res.json(member);
};

export const deleteMemberController =
async (req: any, res: any) => {

  await deleteMember(
    String(req.params.memberId)
  );

  res.json({
    success: true,
  });
};
