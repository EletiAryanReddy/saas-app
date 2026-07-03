
import mongoose from "mongoose";

const elementSchema =
new mongoose.Schema({

type:{
type:String,
enum:[
"rectangle",
"circle",
"line",
"arrow",
"text"
]
},

x:Number,
y:Number,

width:Number,
height:Number,

text:String,

color:{
type:String,
default:"#000000"
}

},
{
_id:false
});

const whiteboardSchema =
new mongoose.Schema({

workspaceId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Workspace",
required:true
},

title:{
type:String,
required:true
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

elements:[
elementSchema
]

},
{
timestamps:true
});

export default mongoose.model(
"Whiteboard",
whiteboardSchema
);
