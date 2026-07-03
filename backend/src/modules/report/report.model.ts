import mongoose from "mongoose";

const reportSchema =
  new mongoose.Schema(
    {
      workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
      },

      generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      type: {
        type: String,
        enum: [
          "TASK",
          "FILE",
          "MEMBER",
          "MEETING",
        ],
      },

      data: {
        type: Object,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Report",
  reportSchema
);