import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ColumnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  cards: [CardSchema],
});

const BoardSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    columns: [ColumnSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Board",
  BoardSchema
);