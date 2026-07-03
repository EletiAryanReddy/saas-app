import { Router } from "express";

import {
  getDashboardController,
} from "./dashboard.controller";

const router = Router();

router.get(
  "/:workspaceId",
  getDashboardController
);

export default router;