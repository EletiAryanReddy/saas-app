
import { Router }
from "express";

import {
createActivityController,
getWorkspaceActivitiesController,
getUserActivitiesController,
deleteActivityController,
getActivityStatsController
}
from "./activity.controller";

const router =
Router();

router.post(
"/",
createActivityController
);

router.get(
"/workspace/:workspaceId",
getWorkspaceActivitiesController
);

router.get(
"/user/:userId",
getUserActivitiesController
);

router.get(
"/stats/:workspaceId",
getActivityStatsController
);

router.delete(
"/:activityId",
deleteActivityController
);

export default router;

