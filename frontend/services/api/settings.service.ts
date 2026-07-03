import axios from "axios";

const API =
"http://localhost:5000/api/settings";

export const createSettings =
(data:any)=>
axios.post(API,data);

export const getSettings =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const updateSettings =
(id:string,data:any)=>
axios.put(
`${API}/${id}`,
data
);

export const deleteSettings =
(id:string)=>
axios.delete(
`${API}/${id}`
);