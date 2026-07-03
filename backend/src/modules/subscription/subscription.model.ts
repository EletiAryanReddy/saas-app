import mongoose from "mongoose";

const subscriptionSchema =
new mongoose.Schema(
{
  workspaceId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Workspace",
    required:true
  },

  plan:{
    type:String,
    enum:[
      "FREE",
      "PRO",
      "BUSINESS"
    ],
    default:"FREE"
  },

  status:{
    type:String,
    enum:[
      "ACTIVE",
      "CANCELLED",
      "EXPIRED"
    ],
    default:"ACTIVE"
  },

  paymentId:{
    type:String
  },

  amount:{
    type:Number,
    default:0
  },

  startDate:{
    type:Date,
    default:Date.now
  },

  endDate:{
    type:Date
  }

},
{
  timestamps:true
}
);

export default mongoose.model(
"Subscription",
subscriptionSchema
);