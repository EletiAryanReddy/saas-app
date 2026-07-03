import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
{
  workspaceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Workspace",
    required:true
  },

  email:{
    type:String,
    required:true
  },

  role:{
    type:String,
    enum:["OWNER","ADMIN","MEMBER"],
    default:"MEMBER"
  },

  invitedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  status:{
    type:String,
    enum:["PENDING","ACCEPTED","REJECTED"],
    default:"PENDING"
  },

  expiresAt:{
    type:Date,
    default:()=>{
      new Date(
        Date.now()+7*24*60*60*1000
      )
    }
  }

},
{
 timestamps:true
}
);

export default mongoose.model(
 "Invitation",
 invitationSchema
);