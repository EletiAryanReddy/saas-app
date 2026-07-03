import mongoose from "mongoose";

const commentSchema =
new mongoose.Schema(
{
  workspaceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Workspace",
    required:true
  },

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  entityId:{
    type:String,
    required:true
  },

  entityType:{
    type:String,
    enum:[
      "TASK",
      "FILE",
      "MEETING",
      "REPORT"
    ],
    required:true
  },

  comment:{
    type:String,
    required:true
  }

},
{
  timestamps:true
}
);

export default mongoose.model(
"Comment",
commentSchema
);