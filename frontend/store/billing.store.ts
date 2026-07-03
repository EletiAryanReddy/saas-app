import { create }
from "zustand";

interface BillingStore{

 subscription:any;

 setSubscription:
 (subscription:any)=>void;

}

export const useBillingStore =
create<BillingStore>(
(set)=>({

 subscription:null,

 setSubscription:
 (subscription)=>
 set({
  subscription
 })

})
);