"use client";

import { useState }
from "react";

import { useTagStore }
from "@/store/tag.store";

export default function CreateTag() {

 const [name,setName] =
 useState("");

 const [color,setColor] =
 useState("#3B82F6");

 const createNewTag =
 useTagStore(
  state =>
  state.createNewTag
 );

 const submit =
 async()=>{

  await createNewTag({
   workspaceId:
   "6a2c2c86bd54aa6fdf34690a",

   createdBy:
   "6a2c2bf8bd54aa6fdf346908",

   name,
   color
  });

  setName("");

 };

 return (

  <div className="space-y-3 border p-4 rounded">

   <input
   value={name}
   onChange={(e)=>
   setName(e.target.value)}
   placeholder="Tag Name"
   className="border p-2 w-full"
   />

   <input
   type="color"
   value={color}
   onChange={(e)=>
   setColor(e.target.value)}
   />

   <button
   onClick={submit}
   className="bg-blue-500 text-white px-4 py-2 rounded"
   >
    Create Tag
   </button>

  </div>

 );

}