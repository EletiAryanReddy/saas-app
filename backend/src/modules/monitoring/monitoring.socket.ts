
import { Server } from "socket.io";

export const registerMonitoringSocket =
(io: Server) => {

io.on(
"connection",
(socket) => {

  console.log(
    "Monitoring Socket Connected:",
    socket.id
  );

  socket.on(
    "monitoring:update",
    (data) => {

      io.emit(
        "monitoring:updated",
        data
      );

    }
  );

  socket.on(
    "monitoring:health",
    (health) => {

      io.emit(
        "monitoring:health-updated",
        health
      );

    }
  );

  socket.on(
    "monitoring:error",
    (errorLog) => {

      io.emit(
        "monitoring:error-created",
        errorLog
      );

    }
  );

  socket.on(
    "monitoring:api-usage",
    (usage) => {

      io.emit(
        "monitoring:api-usage-updated",
        usage
      );

    }
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        "Monitoring Socket Disconnected:",
        socket.id
      );

    }
  );

}

);

};
