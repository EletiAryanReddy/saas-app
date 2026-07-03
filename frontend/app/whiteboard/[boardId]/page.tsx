
"use client";

import {
useEffect,
useState
}
from "react";

import {
useParams
}
from "next/navigation";

import WhiteboardCanvas
from "@/components/whiteboard/WhiteboardCanvas";

import WhiteboardToolbar
from "@/components/whiteboard/WhiteboardToolbar";

import ShapeTools
from "@/components/whiteboard/ShapeTools";

import ColorPicker
from "@/components/whiteboard/ColorPicker";

import Collaborators
from "@/components/whiteboard/Collaborators";

import {
getBoard
}
from "@/services/api/whiteboard.service";

export default function BoardPage(){

const params =
useParams();

const boardId =
params.boardId as string;

const [board,
setBoard] =
useState<any>(null);

const [
selectedTool,
setSelectedTool
] =
useState("pen");

const [
selectedShape,
setSelectedShape
] =
useState("line");

const [
color,
setColor
] =
useState("#000000");

const [
strokeWidth,
setStrokeWidth
] =
useState(2);

const [
backgroundColor,
setBackgroundColor
] =
useState("#ffffff");

const [
collaborators
] =
useState([
{
userId:
"6a2c2bf8bd54aa6fdf346908",

name:
"Aryan",

status:
"online"
}
]);

const loadBoard =
async ()=>{

try{

const res =
await getBoard(
boardId
);

setBoard(
res.data
);

}catch(error){
console.log(error);
}

};

useEffect(()=>{

if(boardId){
loadBoard();
}

},[boardId]);

const undo =
()=>{

console.log(
"Undo"
);

};

const redo =
()=>{

console.log(
"Redo"
);

};

const clearBoard =
()=>{

console.log(
"Clear Board"
);

};

if(!board){

return(

   <div
    className="
    p-8
    "
   >
    Loading...
   </div>

);

}

return(

  <div
   className="
   p-6
   space-y-6
   "
  >

   <h1
    className="
    text-2xl
    font-bold
    "
   >
    {board.title}
   </h1>

<WhiteboardToolbar

selectedTool={
  selectedTool
}

setSelectedTool={
  setSelectedTool
}

undo={undo}

redo={redo}

clearBoard={
  clearBoard
}

/>

   <div
    className="
    grid
    grid-cols-12
    gap-6
    "
   >

<div
 className="
 col-span-3
 space-y-4
 "
>

 <ShapeTools

  selectedShape={
    selectedShape
  }

  onSelectShape={
    setSelectedShape
  }

 />

 <ColorPicker

  color={color}
  setColor={setColor}

  strokeWidth={
    strokeWidth
  }

  setStrokeWidth={
    setStrokeWidth
  }

  backgroundColor={
    backgroundColor
  }

  setBackgroundColor={
    setBackgroundColor
  }

 />

 <Collaborators

  collaborators={
    collaborators
  }

 />

</div>

<div
 className="
 col-span-9
 "
>

 <WhiteboardCanvas
  boardId={boardId}
 />

</div>

   </div>

  </div>

);

}
