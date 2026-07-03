import { create }
from "zustand";

import {
 getTags,
 createTag,
 deleteTag
}
from "@/services/api/tag.service";

interface TagStore {

 tags:any[];

 fetchTags:
 (workspaceId:string)
 => Promise<void>;

 createNewTag:
 (data:any)
 => Promise<void>;

 removeTag:
 (id:string)
 => Promise<void>;
}

export const useTagStore =
create<TagStore>((set)=>({

 tags:[],

 fetchTags:
 async(workspaceId)=>{

  const tags =
  await getTags(
   workspaceId
  );

  set({
   tags
  });

 },

 createNewTag:
 async(data)=>{

  await createTag(data);

 },

 removeTag:
 async(id)=>{

  await deleteTag(id);

 }

}));