import { Server } from "socket.io";

export const settingsSocket =
(io: Server) => {

  io.on(
    "connection",
    (socket) => {

      socket.on(
        "settings-updated",
        (data) => {

          io.emit(
            "settings-changed",
            data
          );

        }
      );

    }
  );

};