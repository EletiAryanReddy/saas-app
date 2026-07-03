import { Request, Response }
from "express";
import {
  getAdminDashboard,
  getAllUsers,
  getAllWorkspaces,
  getSubscriptionStats,
  getRevenue,
  getSystemHealth
}
from "./admin.service";

export const dashboardController =
async (
  req: Request,
  res: Response
) => {

  const data =
    await getAdminDashboard();

  res.json(data);

};

export const usersController =
async (
  req: Request,
  res: Response
) => {

  const users =
    await getAllUsers();

  res.json(users);

};

export const workspacesController =
async (
  req: Request,
  res: Response
) => {

  const workspaces =
    await getAllWorkspaces();

  res.json(workspaces);

};

export const subscriptionStatsController =
async (
  req: Request,
  res: Response
) => {

  const stats =
    await getSubscriptionStats();

  res.json(stats);

};

export const revenueController =
async (
  req: Request,
  res: Response
) => {

  const revenue =
    await getRevenue();

  res.json(revenue);

};

export const systemController =
async (
  req: Request,
  res: Response
) => {

  const data =
    await getSystemHealth();

  res.json(data);

};