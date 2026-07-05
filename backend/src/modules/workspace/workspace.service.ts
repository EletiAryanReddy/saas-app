import Workspace from "./workspace.model";

export const createWorkspace = async (
  name: string,
  description: string,
  ownerId: string
) => {

  const workspace = await Workspace.create({
  name,
  owner: ownerId,
  members: [ownerId],
});

  return workspace;
};

export const getAllWorkspaces = async () => {
  return Workspace.find()
    .populate("owner")
    .populate("members");
};

export const getWorkspaceById = async (id: string) => {
  return Workspace.findById(id)
    .populate("owner")
    .populate("members");
};

export const addMember = async (
  workspaceId: string,
  userId: string
) => {
  return Workspace.findByIdAndUpdate(
    workspaceId,
    {
      $addToSet: {
        members: userId,
      },
    },
    { new: true }
  );
};