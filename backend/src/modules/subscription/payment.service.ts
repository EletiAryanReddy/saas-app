import Razorpay from "razorpay";

const razorpay =
new Razorpay({

  key_id:
  process.env.RAZORPAY_KEY_ID!,

  key_secret:
  process.env.RAZORPAY_SECRET!

});

export const createOrder =
async (
amount:number
)=>{

return await razorpay.orders.create({

  amount:
  amount * 100,

  currency:"INR"

});

};