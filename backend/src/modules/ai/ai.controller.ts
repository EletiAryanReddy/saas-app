import { Request, Response } from "express";

import {
  generateAIResponse,
  getAIHistory,
} from "./ai.service";

export const chatAIController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      prompt,
      workspaceId,
      userId,
    } = req.body;

    const response =
      await generateAIResponse(
        prompt,
        workspaceId,
        userId
      );

    res.json({
      success: true,
      response,
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAIHistoryController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const history =
        await getAIHistory();

      res.json({
        success: true,
        history,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };