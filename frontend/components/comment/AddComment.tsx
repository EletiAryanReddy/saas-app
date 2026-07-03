"use client";

import { useState }
from "react";

export default function
AddComment({
 onSubmit
}:any){

 const[
 comment,
 setComment
 ]=useState("");

 return(

  <div>

   <textarea
   value={comment}
   onChange={(e)=>
   setComment(
    e.target.value
   )}
   />

   <button
   onClick={()=>{
    onSubmit(comment);
    setComment("");
   }}
   >
    Add Comment
   </button>

  </div>

 );

}