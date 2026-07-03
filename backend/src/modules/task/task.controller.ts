import { Request, Response } from "express";

import {
  createTask,
  getTasksByWorkspace,
  updateTaskStatus,
  deleteTask,
} from "./task.service";

export const createTaskController =
  async (req: Request, res: Response) => {
    const task = await createTask(
      req.body
    );

    res.json(task);
  };

export const getTasksController =
  async (req: Request, res: Response) => {
    const tasks =
      await getTasksByWorkspace(
        req.params.workspaceId
      );

    res.json(tasks);
  };

export const updateTaskStatusController =
  async (req: Request, res: Response) => {
    const task =
      await updateTaskStatus(
        req.params.taskId,
        req.body.status
      );

    res.json(task);
  };

export const deleteTaskController =
  async (req: Request, res: Response) => {
    await deleteTask(
      req.params.taskId
    );

    res.json({
      success: true,
      message: "Task Deleted",
    });
  };