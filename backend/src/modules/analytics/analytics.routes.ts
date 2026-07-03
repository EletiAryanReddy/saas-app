import { Router } from "express";
import {
  workspaceAnalytics,
  taskAnalytics,
} from "./analytics.controller";

const router = Router();

router.get(
  "/workspace/:workspaceId",
  workspaceAnalytics
);

router.get(
  "/tasks/:workspaceId",
  taskAnalytics
);

export default router;