"use client";

import { useState }
from "react";

import {
 updateWiki
}
from "@/services/api/wiki.service";

export default function WikiEditor(
{
 wiki
}:any
){

 const [title,setTitle] =
 useState(wiki.title);

 const [content,setContent] =
 useState(wiki.content);

 const save =
 async()=>{

  await updateWiki(
   wiki._id,
   {
    title,
    content
   }
  );

  alert("Updated");

 };

 return(

  <div>

   <input
    value={title}
    onChange={(e)=>
    setTitle(e.target.value)}
   />

   <textarea
    value={content}
    onChange={(e)=>
    setContent(e.target.value)}
   />

   <button
    onClick={save}
   >
    Save
   </button>

  </div>

 );

}