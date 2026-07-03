"use client";

import { useState } from "react";
import { socket } from "@/services/socket/meeting.socket";

export default function MeetingChat({
  roomId,
}: {
  roomId: string;
}) {
  const [message, setMessage] =
    useState("");

  const sendMessage = () => {
    socket.emit(
      "meeting-message",
      {
        roomId,
        sender: "user",
        text: message,
      }
    );

    setMessage("");
  };

  return (
    <div className="p-4">
      <input
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        className="border p-2 w-full"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 mt-2"
      >
        Send
      </button>
    </div>
  );
}