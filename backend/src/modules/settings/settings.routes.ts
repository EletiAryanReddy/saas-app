import { Router } from "express";

import {
  createSettingsController,
  getSettingsController,
  updateSettingsController,
  deleteSettingsController,
} from "./settings.controller";

const router = Router();

router.post(
  "/",
  createSettingsController
);

router.get(
  "/workspace/:workspaceId",
  getSettingsController
);

router.put(
  "/:settingsId",
  updateSettingsController
);

router.delete(
  "/:settingsId",
  deleteSettingsController
);

export default router;