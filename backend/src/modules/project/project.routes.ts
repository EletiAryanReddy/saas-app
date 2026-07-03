import { Router }
from "express";

import {
 createProjectController,
 getProjectsController,
 getProjectController,
 updateProjectController,
 deleteProjectController
}
from "./project.controller";

const router = Router();

router.post(
 "/",
 createProjectController
);

router.get(
 "/workspace/:workspaceId",
 getProjectsController
);

router.get(
 "/:projectId",
 getProjectController
);

router.put(
 "/:projectId",
 updateProjectController
);

router.delete(
 "/:projectId",
 deleteProjectController
);

export default router;