import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import workspaceRoutes from "./modules/workspace/workspace.routes";
import chatRoutes from "./modules/chat/chat.routes";
import channelRoutes from "./modules/channel/channel.routes";
import taskRoutes from "./modules/task/task.routes";
import fileRoutes from "./modules/file/file.routes";

import meetingRoutes from "./modules/meeting/meeting.routes";
import aiRoutes from "./modules/ai/ai.routes";
import notificationRoutes from "./modules/notification/notification.routes";
import boardRoutes from "./modules/board/board.routes";
import activityRoutes from "./modules/activity/activity.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import memberRoutes from "./modules/member/member.routes";
import calendarRoutes from "./modules/calendar/calendar.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import reportRoutes from "./modules/report/report.routes";
import auditRoutes from "./modules/audit/audit.routes";
import settingsRoutes from "./modules/settings/settings.routes";
import subscriptionRoutes from "./modules/subscription/subscription.routes";
import adminRoutes from "./modules/admin/admin.routes";
import searchRoutes from "./modules/search/search.routes";
import commentRoutes from "./modules/comment/comment.routes";
import tagRoutes from "./modules/tag/tag.routes";
import projectRoutes from "./modules/project/project.routes";
import wikiRoutes from "./modules/wiki/wiki.routes";
import invitationRoutes from "./modules/invitation/invitation.routes";
import automationRoutes from "./modules/ai-automation/automation.routes";
import monitoringRoutes from "./modules/monitoring/monitoring.routes";
import whiteboardRoutes from "./modules/whiteboard/whiteboard.routes";
import passport from "./config/passport";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SaaS Backend Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/boards", boardRoutes);
app.use(
  "/api/activity",
  activityRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/members",
  memberRoutes
);

app.use(
  "/api/calendar",
  calendarRoutes
);
app.use(
 "/api/analytics",
 analyticsRoutes
);
app.use(
  "/api/reports",
  reportRoutes
);


app.use(
  "/api/audit",
  auditRoutes
);
app.use(
  "/api/settings",
  settingsRoutes
);

app.use(
"/api/subscription",
subscriptionRoutes
);
app.use(
"/api/admin",
adminRoutes
);

app.use(
  "/api/search",
  searchRoutes
);
app.use(
 "/api/comments",
 commentRoutes
);

app.use(
 "/api/tags",
 tagRoutes
);
app.use(
 "/api/projects",
 projectRoutes
);

app.use(
  "/api/wiki",
  wikiRoutes
);
app.use(
 "/api/invitations",
 invitationRoutes
);

app.use(
 "/api/automation",
 automationRoutes
);

app.use(
  "/api/monitoring",
  monitoringRoutes
);
app.use(
  "/api/whiteboard",
  whiteboardRoutes
);


app.use(passport.initialize());



console.log("Report Routes Loaded");
export default app;