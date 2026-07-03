
import { Router } from "express";

import {
createWhiteboardController,
getWorkspaceWhiteboardsController,
getWhiteboardController,
updateWhiteboardController,
addElementController,
clearWhiteboardController,
duplicateWhiteboardController,
searchWhiteboardsController,
getWhiteboardStatsController,
deleteWhiteboardController
} from "./whiteboard.controller";

const router = Router();

router.post(
"/",
createWhiteboardController
);

router.get(
"/workspace/:workspaceId",
getWorkspaceWhiteboardsController
);

router.get(
"/stats/:workspaceId",
getWhiteboardStatsController
);

router.get(
"/search/:workspaceId",
searchWhiteboardsController
);

router.get(
"/:boardId",
getWhiteboardController
);

router.put(
"/:boardId",
updateWhiteboardController
);

router.post(
"/:boardId/elements",
addElementController
);

router.put(
"/:boardId/clear",
clearWhiteboardController
);

router.post(
"/:boardId/duplicate",
duplicateWhiteboardController
);

router.delete(
"/:boardId",
deleteWhiteboardController
);

export default router;
