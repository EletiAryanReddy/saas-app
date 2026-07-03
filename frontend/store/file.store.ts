import { create }
from "zustand";

export const useFileStore =
create((set) => ({

  files: [],

  setFiles:
  (files: any) =>
    set({ files }),

  addFile:
  (file: any) =>
    set((state: any) => ({
      files: [
        file,
        ...state.files,
      ],
    })),
}));