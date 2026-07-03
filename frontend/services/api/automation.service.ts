
import axios from "axios";

const API =
"http://localhost:5000/api/automation";

export const createAutomation =
(data:any)=>
axios.post(API,data);

export const getAutomations =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const updateAutomation =
(id:string,data:any)=>
axios.put(
`${API}/${id}`,
data
);

export const deleteAutomation =
(id:string)=>
axios.delete(
`${API}/${id}`
);

export const runAutomation =
(id:string)=>
axios.post(
`${API}/run/${id}`
);

export const getAutomationLogs =
(id:string)=>
axios.get(
`${API}/logs/${id}`
);
