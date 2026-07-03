import {
  Request,
  Response,
} from "express";

import {
  createWiki,
  getWorkspaceWikis,
  getWikiById,
  updateWiki,
  deleteWiki,
  searchWiki,
} from "./wiki.service";

export const createWikiController =
async (
  req: Request,
  res: Response
) => {

  try {

    const wiki =
      await createWiki(
        req.body
      );

    res.json({
      success: true,
      wiki,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Create Wiki Failed",
    });

  }

};

export const getWorkspaceWikisController =
async (
  req: Request,
  res: Response
) => {

  const wikis =
    await getWorkspaceWikis(
      req.params.workspaceId
    );

  res.json(wikis);

};

export const getWikiController =
async (
  req: Request,
  res: Response
) => {

  const wiki =
    await getWikiById(
      req.params.wikiId
    );

  res.json(wiki);

};

export const updateWikiController =
async (
  req: Request,
  res: Response
) => {

  const wiki =
    await updateWiki(
      req.params.wikiId,
      req.body
    );

  res.json({
    success: true,
    wiki,
  });

};

export const deleteWikiController =
async (
  req: Request,
  res: Response
) => {

  await deleteWiki(
    req.params.wikiId
  );

  res.json({
    success: true,
    message:
      "Wiki Deleted",
  });

};

export const searchWikiController =
async (
  req: Request,
  res: Response
) => {

  const result =
    await searchWiki(
      req.params.keyword
    );

  res.json(result);

};