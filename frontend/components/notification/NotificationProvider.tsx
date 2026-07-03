"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function NotificationProvider() {

  useEffect(() => {

    socket.emit(
      "join-workspace",
      "6a2c2c86bd54aa6fdf34690a"
    );

    socket.on(
      "notification",
      (notification) => {
        console.log(
          "New Notification:",
          notification
        );
      }
    );

    return () => {
      socket.off("notification");
    };

  }, []);

  return null;
}