import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  content:{
    type:String,
    required:true
  },

  attachments:[String]
},
{
  timestamps:true
}
);

const channelSchema =
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

  type:{
    type:String,
    enum:[
      "PUBLIC",
      "PRIVATE"
    ],
    default:"PUBLIC"
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
  ],

  messages:[messageSchema]
},
{
  timestamps:true
}
);

export default mongoose.model(
  "Channel",
  channelSchema
);