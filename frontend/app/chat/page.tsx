"use client";

import {
  useEffect,
} from "react";

import ChatWindow
from "@/components/chat/ChatWindow";

import MessageInput
from "@/components/chat/MessageInput";

import OnlineUsers
from "@/components/chat/OnlineUsers";

import {
  socket,
} from "@/services/socket/chat.socket";

import {
  getMessages,
  sendMessage,
} from "@/services/api/chat.service";

import {
  useChatStore,
} from "@/store/chat.store";

export default function ChatPage() {

  const workspaceId =
    "6a2c2c86bd54aa6fdf34690a";

  const senderId =
    "6a2c2bf8bd54aa6fdf346908";

  const {
    messages,
    setMessages,
    addMessage,
  } = useChatStore();

  const loadMessages =
  async () => {

    const data =
      await getMessages(
        workspaceId
      );

    setMessages(data);
  };

  useEffect(() => {

    loadMessages();

    socket.emit(
      "join-workspace",
      workspaceId
    );

    socket.on(
      "new-message",
      (message) => {

        addMessage(
          message
        );
      }
    );

    return () => {

      socket.off(
        "new-message"
      );
    };

  }, []);

  const handleSend =
  async (
    text: string
  ) => {

    await sendMessage({
      workspaceId,
      senderId,
      message: text,
    });
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Workspace Chat
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="col-span-3">

          <ChatWindow
            messages={
              messages
            }
          />

          <MessageInput
            onSend={
              handleSend
            }
          />

        </div>

        <OnlineUsers />

      </div>

    </div>
  );
}