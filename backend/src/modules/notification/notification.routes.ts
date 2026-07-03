import { Router }
from "express";

import {
  createNotificationController,
  getNotificationsController,
  markReadController,
  deleteNotificationController,
}
from "./notification.controller";

const router = Router();

router.post(
  "/",
  createNotificationController
);

router.get(
  "/:userId",
  getNotificationsController
);

router.put(
  "/read/:id",
  markReadController
);

router.delete(
  "/:id",
  deleteNotificationController
);

export default router;