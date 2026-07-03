import { Request, Response } from "express";

import {
  globalSearch
} from "./search.service";

export const searchController =
async (
  req: Request,
  res: Response
) => {

  try {

    const {
      workspaceId,
      query
    } = req.query;

    const results =
      await globalSearch(
        workspaceId as string,
        query as string
      );

    res.json({
      success: true,
      results
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Search Failed"
    });

  }

};