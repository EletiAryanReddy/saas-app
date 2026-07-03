import axios from "axios";

const API =
"http://localhost:5000/api/invitations";

export const createInvitation =
(data:any)=>
axios.post(API,data);

export const getInvitations =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const acceptInvitation =
(id:string)=>
axios.post(
`${API}/accept/${id}`
);

export const rejectInvitation =
(id:string)=>
axios.post(
`${API}/reject/${id}`
);

export const deleteInvitation =
(id:string)=>
axios.delete(
`${API}/${id}`
);