import { Router }
from "express";

import {
 dashboardController,
 usersController,
 workspacesController,
 subscriptionStatsController,
 revenueController,
 systemController
}
from "./admin.controller";

import {
 isAdmin
}
from "./admin.middleware";

const router =
Router();

router.get(
"/dashboard",
isAdmin,
dashboardController
);

router.get(
"/users",
isAdmin,
usersController
);

router.get(
"/workspaces",
isAdmin,
workspacesController
);

router.get(
"/subscriptions",
isAdmin,
subscriptionStatsController
);

router.get(
"/revenue",
isAdmin,
revenueController
);
router.get(
  "/system",
  isAdmin,
  systemController
);
export default router;