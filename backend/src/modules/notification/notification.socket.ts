import { Server } from "socket.io";

export const notificationSocket =
(io: Server) => {

  io.on(
    "connection",
    (socket) => {

      socket.on(
        "join-workspace",
        (workspaceId) => {

          socket.join(
            workspaceId
          );

        }
      );

      socket.on(
        "send-notification",
        (data) => {

          io.to(
            data.workspaceId
          ).emit(
            "notification",
            data
          );

        }
      );

    }
  );

};