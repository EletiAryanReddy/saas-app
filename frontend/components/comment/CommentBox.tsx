"use client";

import AddComment
from "./AddComment";

import CommentList
from "./CommentList";

export default function
CommentBox({
 comments,
 onAdd
}:any){

 return(

  <div>

   <AddComment
   onSubmit={onAdd}
   />

   <CommentList
   comments={comments}
   />

  </div>

 );

}