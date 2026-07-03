import { Router } from "express";

import {
  chatAIController,
  getAIHistoryController,
} from "./ai.controller";

const router = Router();

router.post(
  "/chat",
  chatAIController
);

router.get(
  "/history",
  getAIHistoryController
);

export default router;