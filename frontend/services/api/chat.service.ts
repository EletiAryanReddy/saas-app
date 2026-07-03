import axios from "axios";

const API =
"http://localhost:5000/api/chat";

export const sendMessage =
async (data: any) => {

  const res =
    await axios.post(
      API,
      data
    );

  return res.data;
};

export const getMessages =
async (
  workspaceId: string
) => {

  const res =
    await axios.get(
      `${API}/workspace/${workspaceId}`
    );

  return res.data;
};