import mongoose from "mongoose";

const automationSchema =
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

trigger:{
type:String,
enum:[
"SCHEDULE",
"TASK_CREATED",
"TASK_COMPLETED",
"FILE_UPLOADED",
"MEETING_CREATED"
],
required:true
},

action:{
type:String,
enum:[
"GENERATE_REPORT",
"SEND_NOTIFICATION",
"CREATE_EVENT",
"CREATE_TASK"
],
required:true
},

schedule:{
type:String
},

isActive:{
type:Boolean,
default:true
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
"Automation",
automationSchema
);
