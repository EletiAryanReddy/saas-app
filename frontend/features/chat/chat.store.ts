import { create } from "zustand";

type Message = {
  _id?: string;
  sender: any;
  content: string;
  createdAt?: string;
};

type ChatStore = {
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),
}));