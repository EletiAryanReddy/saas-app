import { Request, Response } from "express";
import {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  addMember,
} from "./workspace.service";

export const createWorkspaceController = async (
  req: Request,
  res: Response
) => {
  const { name, description, ownerId } = req.body;

  const workspace = await createWorkspace(
    name,
    description,
    ownerId
  );

  res.json(workspace);
};

export const getWorkspacesController = async (
  req: Request,
  res: Response
) => {
  const workspaces = await getAllWorkspaces();

  res.json(workspaces);
};

export const getWorkspaceController = async (
  req: Request,
  res: Response
) => {
  const workspace = await getWorkspaceById(
    req.params.id
  );

  res.json(workspace);
};

export const addMemberController = async (
  req: Request,
  res: Response
) => {
  const workspace = await addMember(
    req.body.workspaceId,
    req.body.userId
  );

  res.json(workspace);
};