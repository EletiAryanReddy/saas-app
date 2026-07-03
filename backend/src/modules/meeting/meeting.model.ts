import mongoose from "mongoose";

const meetingSchema =
  new mongoose.Schema(
    {
      workspaceId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
      },

      title: String,

      description: String,

      roomId: String,

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      participants: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Meeting",
  meetingSchema
);