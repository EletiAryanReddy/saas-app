import Audit from "./audit.model";

export const createAuditLog = async (
  data: any
) => {
  return await Audit.create(data);
};

export const getWorkspaceAuditLogs =
async (
  workspaceId: string
) => {
  return await Audit.find({
    workspaceId,
  })
    .populate(
      "userId",
      "name email"
    )
    .sort({
      createdAt: -1,
    });
};

export const getUserAuditLogs =
async (
  userId: string
) => {
  return await Audit.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

export const deleteAuditLog =
async (
  auditId: string
) => {
  return await Audit.findByIdAndDelete(
    auditId
  );
};