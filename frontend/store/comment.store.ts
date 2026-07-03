import { create }
from "zustand";

interface CommentStore{

 comments:any[];

 setComments:
 (comments:any[])=>void;

 addComment:
 (comment:any)=>void;

}

export const useCommentStore =
create<CommentStore>(
(set)=>({

 comments:[],

 setComments:
 (comments)=>
 set({
  comments
 }),

 addComment:
 (comment)=>
 set((state)=>({

 comments:[
  comment,
  ...state.comments
 ]

 })),

}))
);