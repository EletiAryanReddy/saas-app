"use client";

import {
 useEffect,
 useState
}
from "react";

import {
 getTags
}
from "@/services/api/tag.service";

export default function TagSelector(
{
 onSelect
}:any
){

 const [tags,setTags] =
 useState<any[]>([]);

 useEffect(()=>{

  getTags(
   "6a2c2c86bd54aa6fdf34690a"
  )
  .then(setTags);

 },[]);

 return (

  <select
  onChange={(e)=>
  onSelect(
   e.target.value
  )
  }
  className="border p-2"
  >

   <option>
    Select Tag
   </option>

   {
    tags.map(
    (tag)=>(
     <option
     key={tag._id}
     value={tag._id}
     >
      {tag.name}
     </option>
    ))
   }

  </select>

 );

}