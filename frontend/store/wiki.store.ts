import { create }
from "zustand";

interface WikiStore {

  wikis:any[];

  setWikis:
  (data:any[])=>void;

}

export const useWikiStore =
create<WikiStore>(
(set)=>({

  wikis:[],

  setWikis:(data)=>
  set({
    wikis:data
  })

})
);