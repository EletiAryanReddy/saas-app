import { Server } from "socket.io";

export const initChatSocket =
(io: Server) => {

  io.on(
    "connection",
    (socket) => {

      socket.on(
        "join-workspace",
        (
          workspaceId
        ) => {

          socket.join(
            workspaceId
          );
        }
      );

      socket.on(
        "disconnect",
        () => {
          console.log(
            "User Disconnected"
          );
        }
      );
    }
  );
};