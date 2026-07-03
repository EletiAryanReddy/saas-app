import { Router } from "express";
import {
  createMeeting,
  getWorkspaceMeetings,
  getMeetingById,
} from "./meeting.controller";

const router = Router();

router.post("/", createMeeting);

router.get(
  "/workspace/:workspaceId",
  getWorkspaceMeetings
);

router.get(
  "/:meetingId",
  getMeetingById
);

export default router;