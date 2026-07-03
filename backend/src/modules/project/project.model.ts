import mongoose from "mongoose";

const projectSchema =
new mongoose.Schema(
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

  description:String,

  status:{
    type:String,
    enum:[
      "ACTIVE",
      "COMPLETED",
      "ARCHIVED"
    ],
    default:"ACTIVE"
  },

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  members:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ]
},
{
  timestamps:true
}
);

export default mongoose.model(
"Project",
projectSchema
);