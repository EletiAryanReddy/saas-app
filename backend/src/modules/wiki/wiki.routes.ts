import { Router }
from "express";

import {
  createWikiController,
  getWorkspaceWikisController,
  getWikiController,
  updateWikiController,
  deleteWikiController,
  searchWikiController,
} from "./wiki.controller";

const router = Router();

router.post(
  "/",
  createWikiController
);

router.get(
  "/workspace/:workspaceId",
  getWorkspaceWikisController
);

router.get(
  "/search/:keyword",
  searchWikiController
);

router.get(
  "/:wikiId",
  getWikiController
);

router.put(
  "/:wikiId",
  updateWikiController
);

router.delete(
  "/:wikiId",
  deleteWikiController
);

export default router;