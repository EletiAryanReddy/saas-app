import { Router } from "express";

import {
  createAudit,
  getWorkspaceAudit,
  getUserAudit,
  deleteAudit,
} from "./audit.controller";

const router = Router();

router.post(
  "/",
  createAudit
);

router.get(
  "/workspace/:workspaceId",
  getWorkspaceAudit
);

router.get(
  "/user/:userId",
  getUserAudit
);

router.delete(
  "/:auditId",
  deleteAudit
);

export default router;