import { Router } from "express";

import {
  createMemberController,
  getMembersController,
  updateRoleController,
  deleteMemberController,
} from "./member.controller";

const router = Router();

router.post(
  "/",
  createMemberController
);

router.get(
  "/workspace/:workspaceId",
  getMembersController
);

router.put(
  "/:memberId",
  updateRoleController
);

router.delete(
  "/:memberId",
  deleteMemberController
);

export default router;