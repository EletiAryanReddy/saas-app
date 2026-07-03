import User from "../user/user.model";
import Workspace from "../workspace/workspace.model";
import Subscription from "../subscription/subscription.model";
import File from "../file/file.model";
import Meeting from "../meeting/meeting.model";
import Report from "../report/report.model";
import Chat from "../chat/chat.model";

export const getAdminDashboard =
async () => {

  const totalUsers =
    await User.countDocuments();

  const totalWorkspaces =
    await Workspace.countDocuments();

  const totalSubscriptions =
    await Subscription.countDocuments();

  const totalFiles =
    await File.countDocuments();

  const totalMeetings =
    await Meeting.countDocuments();

  const totalReports =
    await Report.countDocuments();

  const totalMessages =
    await Chat.countDocuments();

  return {
    totalUsers,
    totalWorkspaces,
    totalSubscriptions,
    totalFiles,
    totalMeetings,
    totalReports,
    totalMessages
  };

};

export const getAllUsers =
async () => {
  return User.find()
    .select("-password")
    .sort({ createdAt: -1 });
};

export const getAllWorkspaces =
async () => {
  return Workspace.find()
    .sort({ createdAt: -1 });
};

export const getSubscriptionStats =
async () => {

  const free =
    await Subscription.countDocuments({
      plan: "FREE"
    });

  const pro =
    await Subscription.countDocuments({
      plan: "PRO"
    });

  const business =
    await Subscription.countDocuments({
      plan: "BUSINESS"
    });

  return {
    free,
    pro,
    business
  };

};

export const getRevenue =
async () => {

  const subscriptions =
    await Subscription.find();

  const revenue =
    subscriptions.reduce(
      (sum: number, sub: any) =>
        sum + (sub.amount || 0),
      0
    );

  return {
    revenue
  };

};

export const getSystemHealth = async () => {
  const files = await File.countDocuments();

  const meetings = await Meeting.countDocuments();

  const reports = await Report.countDocuments();

  const messages = await Chat.countDocuments();

  return {
    files,
    meetings,
    reports,
    messages,
    status: "Healthy"
  };
};