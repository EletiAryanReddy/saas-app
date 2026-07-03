import { useEffect } from "react";
import { socket } from "@/services/socket/socket";
import { useChatStore } from "./chat.store";

export const useChatSocket = (
  channelId: string
) => {

  const addMessage =
    useChatStore(
      (state) => state.addMessage
    );

  useEffect(() => {
    if (!channelId) return;

    socket.emit(
      "join-channel",
      channelId
    );

    const handleMessage = (
      msg: any
    ) => {
      addMessage(msg);
    };

    socket.on(
      "receive-message",
      handleMessage
    );

    return () => {
      socket.emit(
        "leave-channel",
        channelId
      );

      socket.off(
        "receive-message",
        handleMessage
      );
    };
  }, [channelId, addMessage]);
};