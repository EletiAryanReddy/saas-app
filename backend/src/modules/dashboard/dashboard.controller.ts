import {
  getDashboardStats,
} from "./dashboard.service";

export const getDashboardController =
async (req: any, res: any) => {

  const stats =
    await getDashboardStats(
      req.params.workspaceId
    );

  res.json(stats);
};