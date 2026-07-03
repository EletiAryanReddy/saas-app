

import axios from "axios";

const API =
"http://localhost:5000/api/calendar";

export const createEvent =
(data:any)=>
axios.post(API,data);

export const getWorkspaceEvents =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const getEvent =
(eventId:string)=>
axios.get(
`${API}/${eventId}`
);

export const updateEvent =
(
eventId:string,
data:any
)=>
axios.put(
`${API}/${eventId}`,
data
);

export const deleteEvent =
(eventId:string)=>
axios.delete(
`${API}/${eventId}`
);

export const getTodayEvents =
(workspaceId:string)=>
axios.get(
`${API}/today/${workspaceId}`
);

export const getUpcomingEvents =
(workspaceId:string)=>
axios.get(
`${API}/upcoming/${workspaceId}`
);

export const getStats =
(workspaceId:string)=>
axios.get(
`${API}/stats/${workspaceId}`
);

export const searchEvents =
(
workspaceId:string,
keyword:string
)=>
axios.get(
`${API}/search/${workspaceId}?keyword=${keyword}`
);

export const createRecurringEvent =
(data:any)=>
axios.post(
`${API}/recurring`,
data
);

export const addParticipant =
(
eventId:string,
userId:string
)=>
axios.post(
`${API}/${eventId}/participants`,
{
userId
}
);

export const removeParticipant =
(
eventId:string,
userId:string
)=>
axios.delete(
`${API}/${eventId}/participants`,
{
data:{
userId
}
}
);
