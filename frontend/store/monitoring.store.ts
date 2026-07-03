
import { create }
from "zustand";

export const useMonitoringStore =
create((set)=>({

monitoring:[],
health:{},
apiUsage:[],
errorLogs:[],
stats:{},

setMonitoring:
(monitoring:any)=>
set({monitoring}),

setHealth:
(health:any)=>
set({health}),

setApiUsage:
(apiUsage:any)=>
set({apiUsage}),

setErrorLogs:
(errorLogs:any)=>
set({errorLogs}),

setStats:
(stats:any)=>
set({stats})

}));

