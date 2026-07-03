"use client";

import { useState }
from "react";

import {
 createWiki
}
from "@/services/api/wiki.service";

export default function CreateWiki(){

 const [title,setTitle] =
 useState("");

 const [content,setContent] =
 useState("");

 const create =
 async()=>{

  await createWiki({

   workspaceId:
   "6a2c2c86bd54aa6fdf34690a",

   title,

   content,

   createdBy:
   "6a2c2bf8bd54aa6fdf346908"

  });

  alert("Wiki Created");

 };

 return(

  <div>

   <input
    placeholder="Title"
    value={title}
    onChange={(e)=>
    setTitle(e.target.value)}
   />

   <textarea
    placeholder="Content"
    value={content}
    onChange={(e)=>
    setContent(e.target.value)}
   />

   <button
    onClick={create}
   >
    Create Wiki
   </button>

  </div>

 );

}