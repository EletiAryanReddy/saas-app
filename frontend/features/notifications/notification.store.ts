import { create } from "zustand";

export interface Notification {
  _id?: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;

  setNotifications: (
    notifications: Notification[]
  ) => void;

  addNotification: (
    notification: Notification
  ) => void;

  markAsRead: (id: string) => void;
}

export const useNotificationStore =
  create<NotificationStore>((set) => ({
    notifications: [],
    unreadCount: 0,

    setNotifications: (notifications) =>
      set({
        notifications,
        unreadCount:
          notifications.filter(
            (n) => !n.isRead
          ).length,
      }),

    addNotification: (notification) =>
      set((state) => ({
        notifications: [
          notification,
          ...state.notifications,
        ],
        unreadCount:
          state.unreadCount + 1,
      })),

    markAsRead: (id) =>
      set((state) => ({
        notifications:
          state.notifications.map((n) =>
            n._id === id
              ? {
                  ...n,
                  isRead: true,
                }
              : n
          ),

        unreadCount:
          state.notifications.filter(
            (n) =>
              !n.isRead &&
              n._id !== id
          ).length,
      })),
  }));