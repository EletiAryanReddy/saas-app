"use client";

import {
  useState,
} from "react";

export default function MessageInput({
  onSend,
}: any) {

  const [
    text,
    setText,
  ] = useState("");

  return (
    <div className="flex gap-2">

      <input
        className="border p-2 flex-1"
        value={text}
        onChange={(e) =>
          setText(
            e.target.value
          )
        }
      />

      <button
        className="bg-blue-500 text-white px-4"
        onClick={() => {

          onSend(text);

          setText("");
        }}
      >
        Send
      </button>

    </div>
  );
}