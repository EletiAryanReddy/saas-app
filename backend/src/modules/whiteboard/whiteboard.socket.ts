
import { Server } from "socket.io";

export const registerWhiteboardSocket =
(io: Server) => {

io.on(
"connection",
(socket) => {

  console.log(
    "Whiteboard Connected:",
    socket.id
  );

  // Join Whiteboard Room
  socket.on(
    "whiteboard:join",
    (
      boardId:string
    ) => {

      socket.join(
        boardId
      );

      io.to(boardId).emit(
        "whiteboard:user-joined",
        {
          socketId:
          socket.id
        }
      );

    }
  );

  // Leave Whiteboard
  socket.on(
    "whiteboard:leave",
    (
      boardId:string
    ) => {

      socket.leave(
        boardId
      );

      io.to(boardId).emit(
        "whiteboard:user-left",
        {
          socketId:
          socket.id
        }
      );

    }
  );

  // Draw Element
  socket.on(
    "whiteboard:draw",
    (
      data
    ) => {

      io.to(
        data.boardId
      ).emit(
        "whiteboard:drawing",
        data
      );

    }
  );

  // Update Board
  socket.on(
    "whiteboard:update",
    (
      data
    ) => {

      io.to(
        data.boardId
      ).emit(
        "whiteboard:updated",
        data
      );

    }
  );

  // Delete Element
  socket.on(
    "whiteboard:delete-element",
    (
      data
    ) => {

      io.to(
        data.boardId
      ).emit(
        "whiteboard:element-deleted",
        data
      );

    }
  );

  // Cursor Tracking
  socket.on(
    "cursor:move",
    (
      data
    ) => {

      socket
      .to(
        data.boardId
      )
      .emit(
        "cursor:moved",
        {
          userId:
          data.userId,

          x:data.x,
          y:data.y
        }
      );

    }
  );

  // User Presence
  socket.on(
    "whiteboard:user-online",
    (
      data
    ) => {

      io.to(
        data.boardId
      ).emit(
        "whiteboard:online-user",
        data
      );

    }
  );

  // Clear Board
  socket.on(
    "whiteboard:clear",
    (
      boardId:string
    ) => {

      io.to(
        boardId
      ).emit(
        "whiteboard:cleared"
      );

    }
  );

  // Undo
  socket.on(
    "whiteboard:undo",
    (
      data
    ) => {

      io.to(
        data.boardId
      ).emit(
        "whiteboard:undo-action",
        data
      );

    }
  );

  // Redo
  socket.on(
    "whiteboard:redo",
    (
      data
    ) => {

      io.to(
        data.boardId
      ).emit(
        "whiteboard:redo-action",
        data
      );

    }
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        "Whiteboard Disconnected:",
        socket.id
      );

    }
  );

}

);

};
