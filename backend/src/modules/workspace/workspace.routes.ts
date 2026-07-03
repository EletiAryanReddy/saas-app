import { Router } from "express";

import {
  createWorkspaceController,
  getWorkspacesController,
  getWorkspaceController,
  addMemberController,
} from "./workspace.controller";

const router = Router();

router.post("/create", createWorkspaceController);

router.get("/", getWorkspacesController);

router.get("/:id", getWorkspaceController);

router.post("/add-member", addMemberController);

export default router;