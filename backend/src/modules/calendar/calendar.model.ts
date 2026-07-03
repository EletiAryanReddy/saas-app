
import mongoose,
{
Schema,
Document
}
from "mongoose";

export interface ICalendar
extends Document {

workspaceId:string;

title:string;

description?:string;

startTime:Date;

endTime:Date;

participants:string;

recurrence:
| "NONE"
| "DAILY"
| "WEEKLY"
| "MONTHLY"
| "YEARLY";

reminder:number;

color:string;

createdBy:string;

}

const CalendarSchema =
new Schema<ICalendar>(
{

workspaceId:{
type:String,
required:true
},

title:{
type:String,
required:true
},

description:{
type:String
},

startTime:{
type:Date,
required:true
},

endTime:{
type:Date,
required:true
},

participants:[
{
type:String
}
],

recurrence:{
type:String,

enum:[
"NONE",
"DAILY",
"WEEKLY",
"MONTHLY",
"YEARLY"
],

default:"NONE"
},

reminder:{
type:Number,
default:15
},

color:{
type:String,
default:"#2563eb"
},

createdBy:{
type:String,
required:true
}

},
{
timestamps:true
}
);

export default
mongoose.model<ICalendar>(
"Calendar",
CalendarSchema
);
