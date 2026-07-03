import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
  type: String,
  enum: [
    "Todo",
    "In Progress",
    "Review",
    "Done"
  ],
  default: "Todo"
},

priority: {
  type: String,
  enum: [
    "Low",
    "Medium",
    "High"
  ],
  default: "Medium"
},

    assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

workspaceId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Workspace",
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", TaskSchema);