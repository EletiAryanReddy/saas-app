import axios from "axios";

const API =
"http://localhost:5000/api";

export const searchWorkspace =
async (
  workspaceId: string,
  query: string
) => {

  const res =
    await axios.get(
      `${API}/search`,
      {
        params: {
          workspaceId,
          query
        }
      }
    );

  return res.data;

};