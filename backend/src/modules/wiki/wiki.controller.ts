import { Request, Response } from "express";
import {
  createWiki,
  getWorkspaceWikis,
  getWikiById,
  updateWiki,
  deleteWiki,
  searchWiki,
} from "./wiki.service";

const param = (value: any): string => {
  return Array.isArray(value) ? value[0] : value || "";
};

export const createWikiController = async (req: Request, res: Response) => {
  try {
    const wiki = await createWiki(req.body);
    res.json({ success: true, wiki });
  } catch (error) {
    res.status(500).json({ success: false, message: "Create Wiki Failed" });
  }
};

export const getWorkspaceWikisController = async (req: Request, res: Response) => {
  const wikis = await getWorkspaceWikis(param(String(req.params.workspaceId)));
  res.json(wikis);
};

export const getWikiController = async (req: Request, res: Response) => {
  const wiki = await getWikiById(param(String(req.params.wikiId)));
  res.json(wiki);
};

export const updateWikiController = async (req: Request, res: Response) => {
  const wiki = await updateWiki(param(String(req.params.wikiId)), req.body);
  res.json({ success: true, wiki });
};

export const deleteWikiController = async (req: Request, res: Response) => {
  await deleteWiki(param(String(req.params.wikiId)));
  res.json({ success: true, message: "Wiki Deleted" });
};

export const searchWikiController = async (req: Request, res: Response) => {
  const result = await searchWiki(param(String(req.params.keyword)));
  res.json(result);
};
