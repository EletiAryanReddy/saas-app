import { Request, Response } from "express";

import {
  createSettings,
  getSettings,
  updateSettings,
  deleteSettings,
} from "./settings.service";

export const createSettingsController =
async (
  req: Request,
  res: Response
) => {

  try {

    const settings =
      await createSettings(
        req.body
      );

    res.json({
      success: true,
      settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed To Create Settings",
    });

  }

};

export const getSettingsController =
async (
  req: Request,
  res: Response
) => {

  const settings =
    await getSettings(
      req.params.workspaceId
    );

  res.json(settings);

};

export const updateSettingsController =
async (
  req: Request,
  res: Response
) => {

  const settings =
    await updateSettings(
      req.params.settingsId,
      req.body
    );

  res.json({
    success: true,
    settings,
  });

};

export const deleteSettingsController =
async (
  req: Request,
  res: Response
) => {

  await deleteSettings(
    req.params.settingsId
  );

  res.json({
    success: true,
    message:
      "Settings Deleted",
  });

};