import axios from "axios";

const API =
"http://localhost:5000/api/meetings";

export const createMeeting =
(data:any)=>
axios.post(API,data);

export const joinMeeting =
(data:any)=>
axios.post(
`${API}/join`,
data
);

export const getWorkspaceMeetings =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const endMeeting =
(id:string)=>
axios.put(
`${API}/end/${id}`
);