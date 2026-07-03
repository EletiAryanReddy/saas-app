import axios from "axios";

const API =
process.env.NEXT_PUBLIC_API_URL;

export const createTag =
async(data:any)=>{

 const res =
 await axios.post(
  `${API}/api/tags`,
  data
 );

 return res.data;

};

export const getTags =
async(
 workspaceId:string
)=>{

 const res =
 await axios.get(
 `${API}/api/tags/workspace/${workspaceId}`
 );

 return res.data;

};

export const getTag =
async(
 tagId:string
)=>{

 const res =
 await axios.get(
 `${API}/api/tags/${tagId}`
 );

 return res.data;

};

export const updateTag =
async(
 tagId:string,
 data:any
)=>{

 const res =
 await axios.put(
 `${API}/api/tags/${tagId}`,
 data
 );

 return res.data;

};

export const deleteTag =
async(
 tagId:string
)=>{

 const res =
 await axios.delete(
 `${API}/api/tags/${tagId}`
 );

 return res.data;

};