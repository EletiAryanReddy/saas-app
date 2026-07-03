import {
 Request,
 Response
}
from "express";

export const razorpayWebhook =
async (
req:Request,
res:Response
)=>{

 console.log(
 "Webhook Received"
 );

 console.log(req.body);

 res.status(200).json({
  success:true
 });

};