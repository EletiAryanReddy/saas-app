import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Member", "Viewer"],
      default: "Member",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Member",
  MemberSchema
);