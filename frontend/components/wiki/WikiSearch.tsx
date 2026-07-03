"use client";

import {
 useState
}
from "react";

import {
 searchWiki
}
from "@/services/api/wiki.service";

export default function WikiSearch(){

 const [keyword,setKeyword] =
 useState("");

 const [results,setResults] =
 useState<any[]>([]);

 const search =
 async()=>{

  const res =
  await searchWiki(
   keyword
  );

  setResults(
   res.data
  );

 };

 return(

  <div>

   <input
    value={keyword}
    onChange={(e)=>
    setKeyword(
      e.target.value
    )}
   />

   <button
    onClick={search}
   >
    Search
   </button>

   {
    results.map(
    (wiki:any)=>(

     <div
      key={wiki._id}
     >
      {wiki.title}
     </div>

    ))
   }

  </div>

 );

}