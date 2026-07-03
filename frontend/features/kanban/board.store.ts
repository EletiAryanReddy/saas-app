import { create } from "zustand";
import { Board } from "./board.types";

interface BoardStore {
  boards: Board[];

  setBoards: (
    boards: Board[]
  ) => void;

  updateBoard: (
    board: Board
  ) => void;

  addBoard: (
    board: Board
  ) => void;
}

export const useBoardStore =
  create<BoardStore>((set) => ({
    boards: [],

    setBoards: (boards) =>
      set({ boards }),

    addBoard: (board) =>
      set((state) => ({
        boards: [
          ...state.boards,
          board,
        ],
      })),

    updateBoard: (updatedBoard) =>
      set((state) => ({
        boards: state.boards.map(
          (board) =>
            board._id ===
            updatedBoard._id
              ? updatedBoard
              : board
        ),
      })),
  }));