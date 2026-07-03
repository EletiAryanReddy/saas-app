
import axios from "axios";

const API =
"http://localhost:5000/api/whiteboard";

export const createBoard =
(data:any)=>
axios.post(API,data);

export const getWorkspaceBoards =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const getBoard =
(boardId:string)=>
axios.get(
`${API}/${boardId}`
);

export const updateBoard =
(
boardId:string,
data:any
)=>
axios.put(
`${API}/${boardId}`,
data
);

export const addElement =
(
boardId:string,
data:any
)=>
axios.post(
`${API}/${boardId}/elements`,
data
);

export const clearBoard =
(boardId:string)=>
axios.put(
`${API}/${boardId}/clear`
);

export const duplicateBoard =
(boardId:string)=>
axios.post(
`${API}/${boardId}/duplicate`
);

export const deleteBoard =
(boardId:string)=>
axios.delete(
`${API}/${boardId}`
);

export const searchBoards =
(
workspaceId:string,
keyword:string
)=>
axios.get(
`${API}/search/${workspaceId}?keyword=${keyword}`
);

export const getBoardStats =
(workspaceId:string)=>
axios.get(
`${API}/stats/${workspaceId}`
);
