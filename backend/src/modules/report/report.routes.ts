import { Router } from "express";

import {
  generateReportController,
  getReportsController,
  getReportController,
  updateReportController,
  deleteReportController
} from "./report.controller";

const router = Router();

router.post(
  "/generate",
  generateReportController
);

router.get(
  "/workspace/:workspaceId",
  getReportsController
);

router.get(
  "/:reportId",
  getReportController
);

router.put(
  "/:reportId",
  updateReportController
);

router.delete(
  "/:reportId",
  deleteReportController
);

export default router;