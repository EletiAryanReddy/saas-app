import { Request, Response }
from "express";

import {
  createFile,
  getWorkspaceFiles,
  deleteFile,
} from "./file.service";

import {
  uploadToCloudinary,
} from "../../services/cloudinary/upload.service";

export const uploadFileController =
async (
  req: Request,
  res: Response
) => {

  try {

    const file =
      req.file;

    const {
      workspaceId,
      userId,
    } = req.body;

    const result =
      await uploadToCloudinary(
        file!.buffer
      );

    const saved =
      await createFile({
        workspaceId,
        uploadedBy: userId,
        fileName:
          file?.originalname,
        fileUrl:
          result.secure_url,
        fileType:
          file?.mimetype,
        fileSize:
          file?.size,
        cloudinaryId:
          result.public_id,
      });

    res.json(saved);

  } catch (err) {

    res.status(500).json({
      message:
        "Upload Failed",
    });
  }
};

export const getFilesController =
async (
  req: Request,
  res: Response
) => {

  const files =
    await getWorkspaceFiles(
      req.params.workspaceId
    );

  res.json(files);
};

export const deleteFileController =
async (
  req: Request,
  res: Response
) => {

  await deleteFile(
    req.params.id
  );

  res.json({
    success: true,
  });
};