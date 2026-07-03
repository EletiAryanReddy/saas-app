
"use client";

import {
useEffect
}
from "react";

import MonitoringDashboard
from "@/components/monitoring/MonitoringDashboard";

import {
useMonitoringStore
}
from "@/store/monitoring.store";

import {
getLatestHealth,
getApiUsage,
getErrorLogs
}
from "@/services/api/monitoring.service";

export default function MonitoringPage(){

const {

health,
apiUsage,
errorLogs,

setHealth,
setApiUsage,
setErrorLogs

} =
useMonitoringStore();

useEffect(()=>{

loadData();

},[]);

const loadData =
async()=>{

const workspaceId =
"6a2c2c86bd54aa6fdf34690a";

const healthRes =
await getLatestHealth(
workspaceId
);

setHealth(
healthRes.data
);

const usageRes =
await getApiUsage(
workspaceId
);

setApiUsage(
usageRes.data
);

const errorRes =
await getErrorLogs(
workspaceId
);

setErrorLogs(
errorRes.data
);

};

return(

  <div
   className="p-6"
  >

   <h1
    className="
    text-3xl
    font-bold
    mb-6
    "
   >
    Monitoring Dashboard
   </h1>

<MonitoringDashboard
 health={health}
 usage={apiUsage}
 logs={errorLogs}
/>

  </div>

);

}
