import { create }
from "zustand";

import {
 getAnalytics
}
from "@/services/api/analytics.service";

export const useAnalyticsStore =
create((set)=>({

 analytics:null,

 fetchAnalytics:
 async(
  workspaceId:string
 )=>{

 const res =
 await getAnalytics(
  workspaceId
 );

 set({
  analytics:
   res.data
 });

 }

}));