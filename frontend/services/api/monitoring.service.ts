
import axios from "axios";

const API =
"http://localhost:5000/api/monitoring";

export const createMonitoring =
(data:any)=>
axios.post(API,data);

export const getWorkspaceMonitoring =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const getLatestHealth =
(workspaceId:string)=>
axios.get(
`${API}/health/${workspaceId}`
);

export const getApiUsage =
(workspaceId:string)=>
axios.get(
`${API}/api-usage/${workspaceId}`
);

export const getErrorLogs =
(workspaceId:string)=>
axios.get(
`${API}/errors/${workspaceId}`
);

export const getMonitoringStats =
(workspaceId:string)=>
axios.get(
`${API}/stats/${workspaceId}`
);
