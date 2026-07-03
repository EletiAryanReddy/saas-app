import Notification from "./notification.model";

export const createNotification = async (
  data: any
) => {
  return Notification.create(data);
};

export const getUserNotifications =
async (
  userId: string
) => {
  return Notification.find({
    userId,
  }).sort({
    createdAt: -1,
  });
};

export const markAsRead =
async (
  notificationId: string
) => {
  return Notification.findByIdAndUpdate(
    notificationId,
    {
      isRead: true,
    },
    {
      new: true,
    }
  );
};

export const deleteNotification =
async (
  notificationId: string
) => {
  return Notification.findByIdAndDelete(
    notificationId
  );
};