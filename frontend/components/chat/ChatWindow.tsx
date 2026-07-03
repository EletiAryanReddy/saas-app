"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, currentUserId }: { messages: any[]; currentUserId?: string }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const groupMessages = (msgs: any[]) => {
    const groups: { date: string; messages: any[] }[] = [];
    let currentDate = "";
    msgs.forEach((msg) => {
      const msgDate = new Date(msg.createdAt || Date.now()).toLocaleDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: currentDate, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });
    return groups;
  };

  const grouped = groupMessages(messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {grouped.map((group, i) => (
        <div key={i}>
          <div className="flex items-center justify-center my-4">
            <div className="bg-[var(--card)] px-3 py-1 rounded-full text-xs text-[var(--muted)]">
              {group.date === new Date().toLocaleDateString() ? "Today" : group.date}
            </div>
          </div>
          <div className="space-y-3">
            {group.messages.map((message) => (
              <MessageBubble key={message._id} message={message} isOwn={message.senderId?._id === currentUserId} />
            ))}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
