import { create } from "zustand";

interface ChatStore {
  messages: any[];
  selectedChannel: any;
  onlineUsers: string[];
  typingUsers: string[];

  setMessages: (messages: any[]) => void;
  addMessage: (message: any) => void;
  setSelectedChannel: (channel: any) => void;
  setOnlineUsers: (users: string[]) => void;
  setTypingUsers: (users: string[]) => void;
}

export const useChatStore =
  create<ChatStore>((set) => ({
    messages: [],
    selectedChannel: null,
    onlineUsers: [],
    typingUsers: [],

    setMessages: (messages) =>
      set({
        messages,
      }),

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    setSelectedChannel: (channel) =>
      set({
        selectedChannel: channel,
      }),

    setOnlineUsers: (users) =>
      set({
        onlineUsers: users,
      }),

    setTypingUsers: (users) =>
      set({
        typingUsers: users,
      }),
  }));