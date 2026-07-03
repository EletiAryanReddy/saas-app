
import mongoose from "mongoose";

const monitoringSchema =
new mongoose.Schema(
{
workspaceId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Workspace",
required:true
},

cpuUsage:{
type:Number,
default:0
},

memoryUsage:{
type:Number,
default:0
},

storageUsage:{
type:Number,
default:0
},

activeUsers:{
type:Number,
default:0
},

apiRequests:{
type:Number,
default:0
},

errorCount:{
type:Number,
default:0
},

endpoint:{
type:String
},

method:{
type:String
},

statusCode:{
type:Number
},

responseTime:{
type:Number
}
},
{
timestamps:true
}
);

export default mongoose.model(
"Monitoring",
monitoringSchema
);
