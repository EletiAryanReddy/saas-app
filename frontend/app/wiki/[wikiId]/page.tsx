"use client";

import {
 useEffect,
 useState
}
from "react";

import {
 getWiki
}
from "@/services/api/wiki.service";

import WikiViewer
from "@/components/wiki/WikiViewer";

import WikiEditor
from "@/components/wiki/WikiEditor";

export default function WikiDetails(
{
 params
}:any
){

 const [wiki,setWiki] =
 useState<any>();

 useEffect(()=>{

  load();

 },[]);

 const load =
 async()=>{

  const res =
  await getWiki(
   params.wikiId
  );

  setWiki(
   res.data
  );

 };

 if(!wiki)
 return <p>Loading...</p>;

 return(

  <div>

   <WikiViewer
    wiki={wiki}
   />

   <WikiEditor
    wiki={wiki}
   />

  </div>

 );

}