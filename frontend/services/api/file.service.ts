import axios from "@/lib/axios";

export const uploadFile =
async (
  formData: FormData
) => {

  const res =
    await axios.post(
      "/files/upload",
      formData
    );

  return res.data;
};

export const getFiles =
async (
  workspaceId: string
) => {

  const res =
    await axios.get(
      `/files/workspace/${workspaceId}`
    );

  return res.data;
};

export const deleteFile =
async (
  id: string
) => {

  const res =
    await axios.delete(
      `/files/${id}`
    );

  return res.data;
};