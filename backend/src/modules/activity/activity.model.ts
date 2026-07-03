
import mongoose from "mongoose";

const activitySchema =
new mongoose.Schema(
{
workspaceId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Workspace",
required:true
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

action:{
type:String,
required:true
},

entityType:{
type:String
},

entityId:{
type:String
},

message:{
type:String
}
},
{
timestamps:true
}
);

export default mongoose.model(
"Activity",
activitySchema
);
