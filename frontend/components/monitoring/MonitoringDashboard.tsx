
import SystemHealth
from "./SystemHealth";

import ApiUsageChart
from "./ApiUsageChart";

import ActiveUsers
from "./ActiveUsers";

import StorageUsage
from "./StorageUsage";

import ErrorLogs
from "./ErrorLogs";

export default function MonitoringDashboard(
{
health,
usage,
logs
}:any
){

return(

  <div
   className="
   grid
   grid-cols-2
   gap-4
   "
  >

<SystemHealth
 health={health}
/>

<ActiveUsers
 health={health}
/>

<StorageUsage
 health={health}
/>

<ApiUsageChart
 usage={usage}
/>

<ErrorLogs
 logs={logs}
/>

  </div>

);

}

