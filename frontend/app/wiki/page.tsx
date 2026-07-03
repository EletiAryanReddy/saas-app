"use client";

import {
 useEffect
}
from "react";

import {
 getWorkspaceWikis
}
from "@/services/api/wiki.service";

import {
 useWikiStore
}
from "@/store/wiki.store";

import WikiList
from "@/components/wiki/WikiList";

import CreateWiki
from "@/components/wiki/CreateWiki";

import WikiSearch
from "@/components/wiki/WikiSearch";

export default function WikiPage(){

 const {
  wikis,
  setWikis
 } =
 useWikiStore();

 useEffect(()=>{

  load();

 },[]);

 const load =
 async()=>{

  const res =
  await getWorkspaceWikis(
   "6a2c2c86bd54aa6fdf34690a"
  );

  setWikis(
   res.data
  );

 };

 return(

  <div>

   <h1>
    Wiki
   </h1>

   <CreateWiki/>

   <WikiSearch/>

   <WikiList
    wikis={wikis}
   />

  </div>

 );

}