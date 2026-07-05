import { Request, Response } from "express";
import {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  addMember,
} from "./workspace.service";

const param = (value: any): string => {
  return Array.isArray(value) ? value[0] : value || "";
};

export const createWorkspaceController = async (req: Request, res: Response) => {
  const { name, description, ownerId } = req.body;
  const workspace = await createWorkspace(name, description, ownerId);
  res.json(workspace);
};

export const getWorkspacesController = async (req: Request, res: Response) => {
  const workspaces = await getAllWorkspaces();
  res.json(workspaces);
};

export const getWorkspaceController = async (req: Request, res: Response) => {
  const workspace = await getWorkspaceById(param(String(req.params.id)));
  res.json(workspace);
};

export const addMemberController = async (req: Request, res: Response) => {
  const workspace = await addMember(
    String(req.body.workspaceId || ""),
    String(req.body.userId || "")
  );

  res.json(workspace);
};
