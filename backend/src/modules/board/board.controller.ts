import { Request, Response } from "express";

import {
  createBoard,
  getBoardsByWorkspace,
  createCard,
  moveCard,
  deleteCard,
} from "./board.service";

export const createBoardController =
  async (
    req: Request,
    res: Response
  ) => {
    const board =
      await createBoard(req.body);

    res.json(board);
  };

export const getBoardsController =
  async (
    req: Request,
    res: Response
  ) => {
    const boards =
      await getBoardsByWorkspace(
        String(req.params.workspaceId)
      );

    res.json(boards);
  };

export const createCardController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("BODY:", req.body);

    const board = await createCard(
      String(req.params.boardId),
      req.body.columnTitle,
      req.body.card
    );

    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create card",
    });
  }
};


export const moveCardController =
  async (
    req: Request,
    res: Response
  ) => {
    const board =
      await moveCard(
        String(req.params.boardId),
        req.body.cardId,
        req.body.sourceColumn,
        req.body.targetColumn
      );

    res.json(board);
  };

export const deleteCardController =
  async (
    req: Request,
    res: Response
  ) => {
    const board =
      await deleteCard(
        String(req.params.boardId),
        String(req.params.cardId)
      );

    res.json(board);
  };
