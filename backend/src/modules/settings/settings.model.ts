import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      unique: true,
    },

    workspaceName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },

    enableAI: {
      type: Boolean,
      default: true,
    },

    allowInvites: {
      type: Boolean,
      default: true,
    },

    requireApproval: {
      type: Boolean,
      default: false,
    },

    enableAuditLogs: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Settings",
  settingsSchema
);