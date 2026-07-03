import axios from "axios";

const API =
  "http://localhost:5000/api/wiki";

export const createWiki =
(data:any)=>
axios.post(API,data);

export const getWorkspaceWikis =
(workspaceId:string)=>
axios.get(
`${API}/workspace/${workspaceId}`
);

export const getWiki =
(wikiId:string)=>
axios.get(
`${API}/${wikiId}`
);

export const updateWiki =
(
 wikiId:string,
 data:any
)=>
axios.put(
`${API}/${wikiId}`,
data
);

export const deleteWiki =
(wikiId:string)=>
axios.delete(
`${API}/${wikiId}`
);

export const searchWiki =
(keyword:string)=>
axios.get(
`${API}/search/${keyword}`
);