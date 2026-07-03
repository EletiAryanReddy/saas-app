import { Router } from "express";

import {
  createBoardController,
  getBoardsController,
  createCardController,
  moveCardController,
  deleteCardController,
} from "./board.controller";

const router = Router();

router.post(
  "/",
  createBoardController
);

router.get(
  "/:workspaceId",
  getBoardsController
);

router.post(
  "/:boardId/card",
  createCardController
);

router.put(
  "/:boardId/move",
  moveCardController
);

router.delete(
  "/:boardId/card/:cardId",
  deleteCardController
);

export default router;