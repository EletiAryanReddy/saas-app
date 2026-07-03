import { Router } from "express";

import {
 createTagController,
 getTagsController,
 getTagController,
 updateTagController,
 deleteTagController
}
from "./tag.controller";

const router = Router();

router.post(
 "/",
 createTagController
);

router.get(
 "/workspace/:workspaceId",
 getTagsController
);

router.get(
 "/:tagId",
 getTagController
);

router.put(
 "/:tagId",
 updateTagController
);

router.delete(
 "/:tagId",
 deleteTagController
);

export default router;