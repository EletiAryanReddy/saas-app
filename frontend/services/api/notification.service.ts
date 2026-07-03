import axios from "axios";

const API =
"http://localhost:5000/api/notifications";

export const getNotifications =
(userId:string)=>
axios.get(
`${API}/${userId}`
);

export const createNotification =
(data:any)=>
axios.post(
API,
data
);

export const markRead =
(id:string)=>
axios.put(
`${API}/read/${id}`
);

export const deleteNotification =
(id:string)=>
axios.delete(
`${API}/${id}`
);