import { Router }
from "express";

import {
 createCommentController,
 getCommentsController,
 updateCommentController,
 deleteCommentController
}
from "./comment.controller";

const router = Router();

router.post(
 "/",
 createCommentController
);

router.get(
 "/:entityId",
 getCommentsController
);

router.put(
 "/:id",
 updateCommentController
);

router.delete(
 "/:id",
 deleteCommentController
);

export default router;