import { Server }
from "socket.io";

export const wikiSocket =
(io: Server) => {

  io.on(
    "connection",
    (socket) => {

      console.log(
        "Wiki User Connected",
        socket.id
      );

      socket.on(
        "join-wiki",
        (wikiId) => {

          socket.join(
            wikiId
          );

        }
      );

      socket.on(
        "wiki-edit",
        (data) => {

          socket
          .to(data.wikiId)
          .emit(
            "wiki-updated",
            data
          );

        }
      );

      socket.on(
        "disconnect",
        () => {

          console.log(
            "Wiki User Disconnected"
          );

        }
      );

    }
  );

};