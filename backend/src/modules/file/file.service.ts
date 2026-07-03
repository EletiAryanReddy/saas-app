import File from "./file.model";

export const createFile = async (
  data: any
) => {
  return await File.create(data);
};

export const getWorkspaceFiles =
async (
  workspaceId: string
) => {
  return await File.find({
    workspaceId,
  }).sort({
    createdAt: -1,
  });
};

export const deleteFile =
async (id: string) => {
  return await File.findByIdAndDelete(
    id
  );
};