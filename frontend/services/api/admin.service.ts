import axios from "axios";

const API =
"http://localhost:5000/api/admin";

export const getDashboard =
() =>
axios.get(
`${API}/dashboard`,
{
headers:{
role:"ADMIN"
}
}
);

export const getUsers =
() =>
axios.get(
`${API}/users`,
{
headers:{
role:"ADMIN"
}
}
);

export const getWorkspaces =
() =>
axios.get(
`${API}/workspaces`,
{
headers:{
role:"ADMIN"
}
}
);

export const getSubscriptions =
() =>
axios.get(
`${API}/subscriptions`,
{
headers:{
role:"ADMIN"
}
}
);

export const getRevenue =
() =>
axios.get(
`${API}/revenue`,
{
headers:{
role:"ADMIN"
}
}
);