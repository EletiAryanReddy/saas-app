import { Router } from "express";

import {
  createTaskController,
  getTasksController,
  updateTaskStatusController,
  deleteTaskController,
} from "./task.controller";

const router = Router();

router.post(
  "/create",
  createTaskController
);

router.get(
  "/workspace/:workspaceId",
  getTasksController
);

router.put(
  "/status/:taskId",
  updateTaskStatusController
);

router.delete(
  "/:taskId",
  deleteTaskController
);

export default router;