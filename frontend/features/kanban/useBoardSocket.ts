"use client";

import { useEffect } from "react";

import { socket }
from "@/services/socket/socket";

import { useBoardStore }
from "./board.store";

export const useBoardSocket = (
  boardId: string
) => {
  const updateBoard =
    useBoardStore(
      (s) => s.updateBoard
    );

  useEffect(() => {
    if (!boardId) return;

    socket.emit(
      "board:join",
      boardId
    );

    socket.on(
      "board:updated",
      (board) => {
        updateBoard(board);
      }
    );

    return () => {
      socket.off(
        "board:updated"
      );
    };
  }, [
    boardId,
    updateBoard,
  ]);
};