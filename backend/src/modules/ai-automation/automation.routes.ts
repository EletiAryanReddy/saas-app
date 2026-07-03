
import { Router } from "express";

import {
createAutomationController,
getWorkspaceAutomationsController,
getAutomationController,
updateAutomationController,
deleteAutomationController,
runAutomationController,
getAutomationLogsController
}
from "./automation.controller";

const router = Router();

router.post(
"/",
createAutomationController
);

router.get(
"/workspace/:workspaceId",
getWorkspaceAutomationsController
);

router.get(
"/:automationId",
getAutomationController
);

router.put(
"/:automationId",
updateAutomationController
);

router.delete(
"/:automationId",
deleteAutomationController
);

router.post(
"/run/:automationId",
runAutomationController
);

router.get(
"/logs/:automationId",
getAutomationLogsController
);

export default router;

