import { Request, Response }
from "express";

import {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
}
from "./notification.service";

export const createNotificationController =
async (
  req: Request,
  res: Response
) => {
  try {

    const notification =
      await createNotification(
        req.body
      );

    res.json({
      success: true,
      notification,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
      "Notification Creation Failed",
    });

  }
};

export const getNotificationsController =
async (
  req: Request,
  res: Response
) => {

  const notifications =
    await getUserNotifications(
      req.params.userId
    );

  res.json(notifications);
};

export const markReadController =
async (
  req: Request,
  res: Response
) => {

  const notification =
    await markAsRead(
      req.params.id
    );

  res.json({
    success: true,
    notification,
  });

};

export const deleteNotificationController =
async (
  req: Request,
  res: Response
) => {

  await deleteNotification(
    req.params.id
  );

  res.json({
    success: true,
    message:
      "Notification Deleted",
  });

};