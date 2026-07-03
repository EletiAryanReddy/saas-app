
import { Router } from "express";

import {
createMonitoringController,
getWorkspaceMonitoringController,
getMonitoringController,
updateMonitoringController,
deleteMonitoringController,
getLatestHealthController,
getApiUsageController,
getErrorLogsController,
getMonitoringStatsController
} from "./monitoring.controller";

const router = Router();

router.post(
"/",
createMonitoringController
);

router.get(
"/workspace/:workspaceId",
getWorkspaceMonitoringController
);

router.get(
"/health/:workspaceId",
getLatestHealthController
);

router.get(
"/api-usage/:workspaceId",
getApiUsageController
);

router.get(
"/errors/:workspaceId",
getErrorLogsController
);

router.get(
"/stats/:workspaceId",
getMonitoringStatsController
);

router.get(
"/:monitoringId",
getMonitoringController
);

router.put(
"/:monitoringId",
updateMonitoringController
);

router.delete(
"/:monitoringId",
deleteMonitoringController
);

export default router;
