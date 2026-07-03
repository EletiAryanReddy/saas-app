import Subscription from "./subscription.model";

export const createSubscription =
async (
data:any
)=>{
 return Subscription.create(data);
};

export const getWorkspaceSubscription =
async (
workspaceId:string
)=>{
 return Subscription.findOne({
  workspaceId
 });
};

export const updateSubscription =
async (
id:string,
data:any
)=>{
 return Subscription.findByIdAndUpdate(
  id,
  data,
  {
   new:true
  }
 );
};

export const deleteSubscription =
async (
id:string
)=>{
 return Subscription.findByIdAndDelete(
  id
 );
};

export const getAllSubscriptions =
async ()=>{
 return Subscription.find()
 .sort({
  createdAt:-1
 });
};