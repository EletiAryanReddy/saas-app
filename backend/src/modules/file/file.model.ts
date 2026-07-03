import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: String,

    fileUrl: String,

    fileType: String,

    fileSize: Number,

    cloudinaryId: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "File",
  fileSchema
);