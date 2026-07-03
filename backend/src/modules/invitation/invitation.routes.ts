import { Router }
from "express";

import {
 createInvitationController,
 getInvitationsController,
 acceptInvitationController,
 rejectInvitationController,
 deleteInvitationController
}
from "./invitation.controller";

const router = Router();

router.post(
 "/",
 createInvitationController
);

router.get(
 "/workspace/:workspaceId",
 getInvitationsController
);

router.post(
 "/accept/:inviteId",
 acceptInvitationController
);

router.post(
 "/reject/:inviteId",
 rejectInvitationController
);

router.delete(
 "/:inviteId",
 deleteInvitationController
);

export default router;