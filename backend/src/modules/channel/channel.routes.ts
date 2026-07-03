import { Router }
from "express";

import {
 createChannelController,
 getChannelsController,
 getChannelController,
 sendMessageController,
 deleteChannelController
}
from "./channel.controller";

const router = Router();

router.post(
 "/",
 createChannelController
);

router.get(
 "/workspace/:workspaceId",
 getChannelsController
);

router.get(
 "/:channelId",
 getChannelController
);

router.post(
 "/:channelId/message",
 sendMessageController
);

router.delete(
 "/:channelId",
 deleteChannelController
);

export default router;