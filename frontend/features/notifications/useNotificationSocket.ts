"use client";

import { useEffect } from "react";
import { socket } from "@/services/socket/socket";

import {
  useNotificationStore,
} from "./notification.store";

export const useNotificationSocket =
  () => {
    const addNotification =
      useNotificationStore(
        (s) => s.addNotification
      );

    useEffect(() => {
      socket.on(
        "new-notification",
        (notification) => {
          addNotification(
            notification
          );
        }
      );

      return () => {
        socket.off(
          "new-notification"
        );
      };
    }, [addNotification]);
  };