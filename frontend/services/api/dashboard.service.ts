import axios from "axios";

const API =
  "http://localhost:5000/api/dashboard";



export const getDashboard =
async (workspaceId: string) => {

 const res =
await axios.get(
"http://localhost:5000/api/analytics/workspace/6a2c2c86bd54aa6fdf34690a"
);

  return res.data;
};