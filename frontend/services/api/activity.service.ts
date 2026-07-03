
import axios from "axios";

const API =
"http://localhost:5000/api/activity";

export const createActivity =
(data:any)=>
axios.post(API,data);

export const getWorkspaceActivities =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const getUserActivities =
(userId:string)=>
axios.get(
`${API}/user/${userId}`
);

export const getActivityStats =
(workspaceId:string)=>
axios.get(
`${API}/stats/${workspaceId}`
);

export const deleteActivity =
(id:string)=>
axios.delete(
`${API}/${id}`
);


