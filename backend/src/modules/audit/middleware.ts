import {
  createAuditLog,
} from "./audit.service";

export const logActivity =
(
  action: string,
  entityType: string
) =>
async (
  req: any,
  res: any,
  next: any
) => {

  res.on(
    "finish",
    async () => {

      if (
        res.statusCode === 200 ||
        res.statusCode === 201
      ) {

        await createAuditLog({
          workspaceId:
            req.body.workspaceId,

          userId:
            req.body.userId,

          action,

          entityType,

          entityId:
            req.body.entityId,
        });

      }

    }
  );

  next();
};