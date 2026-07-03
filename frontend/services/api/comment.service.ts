import axios from "axios";

const API =
"http://localhost:5000/api/comments";

export const createComment =
(data:any)=>
axios.post(
 API,
 data
);

export const getComments =
(entityId:string)=>
axios.get(
 `${API}/${entityId}`
);

export const deleteComment =
(id:string)=>
axios.delete(
 `${API}/${id}`
);