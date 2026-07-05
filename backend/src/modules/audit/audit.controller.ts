import {
  createAuditLog,
  getWorkspaceAuditLogs,
  getUserAuditLogs,
  deleteAuditLog,
} from "./audit.service";

export const createAudit =
async (
  req: any,
  res: any
) => {
  try {

    const audit =
      await createAuditLog(
        req.body
      );

    res.json({
      success: true,
      audit,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed to create audit",
    });

  }
};

export const getWorkspaceAudit =
async (
  req: any,
  res: any
) => {

  const logs =
    await getWorkspaceAuditLogs(
      String(req.params.workspaceId)
    );

  res.json(logs);
};

export const getUserAudit =
async (
  req: any,
  res: any
) => {

  const logs =
    await getUserAuditLogs(
      String(req.params.userId)
    );

  res.json(logs);
};

export const deleteAudit =
async (
  req: any,
  res: any
) => {

  await deleteAuditLog(
    String(req.params.auditId)
  );

  res.json({
    success: true,
    message:
      "Audit deleted",
  });

};
