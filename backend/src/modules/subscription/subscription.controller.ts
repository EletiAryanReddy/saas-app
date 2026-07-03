import { Request, Response }
from "express";

import {
 createSubscription,
 getWorkspaceSubscription,
 updateSubscription,
 deleteSubscription,
 getAllSubscriptions
}
from "./subscription.service";

import {
 createOrder
}
from "./payment.service";

export const createSubscriptionController =
async (
req:Request,
res:Response
)=>{

 try{

 const subscription =
 await createSubscription(
  req.body
 );

 res.json({
  success:true,
  subscription
 });

 }
 catch(error){

  res.status(500).json({
   success:false,
   message:
   "Subscription Creation Failed"
  });

 }

};

export const getSubscriptionController =
async (
req:Request,
res:Response
)=>{

 const data =
 await getWorkspaceSubscription(
 req.params.workspaceId
 );

 res.json(data);

};

export const updateSubscriptionController =
async (
req:Request,
res:Response
)=>{

 const data =
 await updateSubscription(
 req.params.id,
 req.body
 );

 res.json({
  success:true,
  data
 });

};

export const deleteSubscriptionController =
async (
req:Request,
res:Response
)=>{

 await deleteSubscription(
 req.params.id
 );

 res.json({
  success:true,
  message:
  "Subscription Deleted"
 });

};

export const getAllSubscriptionsController =
async (
req:Request,
res:Response
)=>{

 const subscriptions =
 await getAllSubscriptions();

 res.json(subscriptions);

};

export const createOrderController =
async (
req:Request,
res:Response
)=>{

 const order =
 await createOrder(
 req.body.amount
 );

 res.json(order);

};