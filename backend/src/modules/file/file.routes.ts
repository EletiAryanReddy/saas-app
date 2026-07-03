import express
from "express";

import multer
from "multer";

import {
  uploadFileController,
  getFilesController,
  deleteFileController,
}
from "./file.controller";

const router =
  express.Router();

const upload =
  multer();

router.post(
  "/upload",
  upload.single("file"),
  uploadFileController
);

router.get(
  "/workspace/:workspaceId",
  getFilesController
);

router.delete(
  "/:id",
  deleteFileController
);

export default router;