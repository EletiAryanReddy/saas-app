

import { Router } from "express";

import {
  sendMessageController,
  getMessagesController,
} from "./chat.controller";

const router = Router();

router.post(
  "/",
  sendMessageController
);

router.get(
  "/workspace/:workspaceId",
  getMessagesController
);

export default router;