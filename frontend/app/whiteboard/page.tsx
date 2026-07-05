
"use client";

import { useEffect, useState } from "react";

import WhiteboardList
from "@/components/whiteboard/WhiteboardList";

import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";


import {
getWorkspaceBoards,
createBoard,
deleteBoard,
duplicateBoard
}
from "@/services/api/whiteboard.service";

export default function WhiteboardPage(){

const [boards,setBoards] =
useState<any[]>([]);

const workspaceId =
"6a2c2c86bd54aa6fdf34690a";

const loadBoards =
async ()=>{

try{

const res =
await getWorkspaceBoards(
workspaceId
);

setBoards(
res.data
);

}catch(error){
console.log(error);
}

};

useEffect(()=>{
loadBoards();
},[]);

const handleCreate =
async ()=>{

const title =
prompt(
"Board Title"
);

if(!title)
return;

await createBoard({

workspaceId,

title,

createdBy:
"6a2c2bf8bd54aa6fdf346908"

});

loadBoards();

};

const handleDelete =
async (
boardId:string
)=>{

await deleteBoard(
boardId
);

loadBoards();

};

const handleDuplicate =
async (
boardId:string
)=>{

await duplicateBoard(
boardId
);

loadBoards();

};

return(

  <div
   className="
   p-8
   "
  >

   <div
    className="
    flex
    justify-between
    items-center
    mb-6
    "
   >

<h1
 className="
 text-3xl
 font-bold
 "
>
 Whiteboards
</h1>

<button

 onClick={
  handleCreate
 }

 className="
 px-4
 py-2
 bg-blue-600
 text-white
 rounded
 "

>
 Create Board
</button>

   </div>

<WhiteboardList

boards={boards}

onDelete={
  handleDelete
}

onDuplicate={
  handleDuplicate
}
/>

  </div>

);

}
