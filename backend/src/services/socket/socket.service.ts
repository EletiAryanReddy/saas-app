import { Server } from "socket.io";
import Message from "../../modules/chat/message.model";

let io: Server;

const onlineUsers = new Map<string, string>();
const meetingRooms = new Map<string, string[]>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("user-online", (userId: string) => {
      onlineUsers.set(userId, socket.id);

      io.emit(
        "online-users",
        Array.from(onlineUsers.keys())
      );
    });

    socket.on("join-workspace", (workspaceId) => {
      socket.join(workspaceId);
    });

    socket.on("join-channel", (channelId) => {
      socket.join(channelId);
    });

    socket.on("leave-channel", (channelId) => {
      socket.leave(channelId);
    });

    socket.on("send-message", async (data) => {
      try {
        const message = await Message.create({
          workspaceId: data.workspaceId,
          channelId: data.channelId,
          sender: data.senderId,
          content: data.content,
        });

        io.to(data.channelId).emit(
          "receive-message",
          message
        );
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("typing", (data) => {
      socket.to(data.channelId).emit(
        "typing",
        data
      );
    });

    socket.on("send-notification", (data) => {
      const notification = {
        workspaceId: data.workspaceId,
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || "SYSTEM",
        createdAt: new Date(),
      };

      io.to(data.workspaceId).emit(
        "notification",
        notification
      );
    });

    socket.on("join-meeting", ({ roomId, userId }) => {
      socket.join(roomId);

      if (!meetingRooms.has(roomId)) {
        meetingRooms.set(roomId, []);
      }

      const users = meetingRooms.get(roomId) || [];

      if (!users.includes(userId)) {
        users.push(userId);
      }

      meetingRooms.set(roomId, users);

      io.to(roomId).emit(
        "participants",
        users
      );

      socket.to(roomId).emit(
        "user-joined",
        {
          userId,
          socketId: socket.id,
        }
      );
    });

    socket.on("offer", ({ roomId, offer }) => {
      socket.to(roomId).emit("offer", offer);
    });

    socket.on("answer", ({ roomId, answer }) => {
      socket.to(roomId).emit("answer", answer);
    });

    socket.on(
      "ice-candidate",
      ({ roomId, candidate }) => {
        socket.to(roomId).emit(
          "ice-candidate",
          candidate
        );
      }
    );

    socket.on("meeting-message", (data) => {
      io.to(data.roomId).emit(
        "meeting-message",
        data
      );
    });

    socket.on("leave-meeting", ({ roomId, userId }) => {
      socket.leave(roomId);

      const users = meetingRooms.get(roomId);

      if (users) {
        const updatedUsers = users.filter(
          (id) => id !== userId
        );

        meetingRooms.set(roomId, updatedUsers);

        io.to(roomId).emit(
          "participants",
          updatedUsers
        );
      }

      socket.to(roomId).emit(
        "user-left",
        userId
      );
    });

    socket.on("board:join", (boardId) => {
      socket.join(boardId);
    });

    socket.on("board:update", (data) => {
      io.to(data.boardId).emit(
        "board:updated",
        data.updatedBoard
      );
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit(
        "online-users",
        Array.from(onlineUsers.keys())
      );
    });
  });

  return io;
};

export const getIO = () => io;