import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
{
  workspaceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Workspace",
    required:true
  },

  name:{
    type:String,
    required:true
  },

  color:{
    type:String,
    default:"#3B82F6"
  },

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
},
{
  timestamps:true
}
);

export default mongoose.model(
  "Tag",
  tagSchema
);