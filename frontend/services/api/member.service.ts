import axios from "axios";

const API =
  "http://localhost:5000/api/members";

export const createMember =
async (data: any) => {

  const res =
    await axios.post(
      API,
      data
    );

  return res.data;
};

export const getMembers =
async (
  workspaceId: string
) => {

  const res =
    await axios.get(
      `${API}/workspace/${workspaceId}`
    );

  return res.data;
};

export const updateRole =
async (
  memberId: string,
  role: string
) => {

  const res =
    await axios.put(
      `${API}/${memberId}`,
      { role }
    );

  return res.data;
};

export const deleteMember =
async (
  memberId: string
) => {

  const res =
    await axios.delete(
      `${API}/${memberId}`
    );

  return res.data;
};