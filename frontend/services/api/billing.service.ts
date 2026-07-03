import axios from "axios";

const API =
"http://localhost:5000/api/subscription";

export const createSubscription =
(data:any)=>
axios.post(API,data);

export const getSubscription =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const updateSubscription =
(id:string,data:any)=>
axios.put(
`${API}/${id}`,
data
);

export const deleteSubscription =
(id:string)=>
axios.delete(
`${API}/${id}`
);

export const createOrder =
(amount:number)=>
axios.post(
`${API}/create-order`,
{
 amount
}
);