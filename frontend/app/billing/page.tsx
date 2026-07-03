"use client";

import CurrentPlan
from "@/components/billing/CurrentPlan";

import UpgradePlan
from "@/components/billing/UpgradePlan";

import BillingHistory
from "@/components/billing/BillingHistory";

export default function BillingPage(){

 return(

 <div className="p-5">

  <CurrentPlan/>

  <UpgradePlan/>

  <BillingHistory/>

 </div>

 );

}