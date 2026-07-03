"use client";

import { useEffect } from "react";
import ChatWindow from "@/components/chat/ChatWindow";
import MessageInput from "@/components/chat/MessageInput";
import OnlineUsers from "@/components/chat/OnlineUsers";
import { socket } from "@/services/socket/chat.socket";
import { getMessages, sendMessage } from "@/services/api/chat.service";
import { useChatStore } from "@/store/chat.store";

export default function ChatPage() {
  const workspaceId = "6a2c2c86bd54aa6fdf34690a";
  const senderId = "6a2c2bf8bd54aa6fdf346908";
  const { messages, setMessages, addMessage } = useChatStore();

  const loadMessages = async () => {
    const data = await getMessages(workspaceId);
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
    socket.emit("join-workspace", workspaceId);
    socket.on("new-message", (message) => addMessage(message));
    return () => socket.off("new-message");
  }, []);

  const handleSend = async (text: string) => {
    await sendMessage({ workspaceId, senderId, message: text });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <div className="h-16 bg-[var(--card)] border-b border-[var(--border)] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-[var(--text)]">Workspace Chat</h1>
            <p className="text-xs text-[var(--muted)]">5 members online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
            <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
            <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
            <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col bg-[var(--bg-elevated)]">
          <ChatWindow messages={messages} currentUserId={senderId} />
          <MessageInput onSend={handleSend} />
        </div>
        <OnlineUsers />
      </div>
    </div>
  );
}
