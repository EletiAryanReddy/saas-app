
"use client";

import {
useRef,
useEffect,
useState
}
from "react";

import io
from "socket.io-client";

const socket =
io(
"http://localhost:5000"
);

export default function WhiteboardCanvas(
{
boardId
}:any
){

const canvasRef =
useRef<
HTMLCanvasElement> (null);

const [drawing,
setDrawing] =
useState(false);

const [color,
setColor] =
useState("#000000");

const [elements,
setElements] =
useState<any[]>([]);

useEffect(()=>{

socket.emit(
"whiteboard:join",
boardId
);

socket.on(
"whiteboard:drawing",
(
data:any
)=>{

drawLine(
  data.startX,
  data.startY,
  data.endX,
  data.endY,
  data.color
);

}
);

socket.on(
"whiteboard:cleared",
()=>{
clearCanvas();
}
);

return ()=>{

socket.emit(
"whiteboard:leave",
boardId
);

socket.off(
"whiteboard:drawing"
);

};

},[]);

const getContext =
()=>{

const canvas =
canvasRef.current;

if(!canvas)
return null;

return canvas.getContext(
"2d"
);

};

const drawLine =
(
startX:number,
startY:number,
endX:number,
endY:number,
color:string
)=>{

const ctx =
getContext();

if(!ctx)
return;

ctx.beginPath();

ctx.strokeStyle =
color;

ctx.lineWidth = 2;

ctx.moveTo(
startX,
startY
);

ctx.lineTo(
endX,
endY
);

ctx.stroke();

};

const startDrawing =
(
e:any
)=>{

setDrawing(true);

const rect =
canvasRef.current!
.getBoundingClientRect();

setElements([
{
x:
e.clientX -
rect.left,

y:
e.clientY -
rect.top

}
]);

};

const draw =
(
e:any
)=>{

if(!drawing)
return;

const rect =
canvasRef.current!
.getBoundingClientRect();

const x =
e.clientX -
rect.left;

const y =
e.clientY -
rect.top;

const last =
elements[
elements.length-1
];

if(!last)
return;

drawLine(
last.x,
last.y,
x,
y,
color
);

socket.emit(
"whiteboard:draw",
{
boardId,
startX:last.x,
startY:last.y,
endX:x,
endY:y,
color
}
);

setElements(
[
...elements,
{x,y}
]
);

};

const stopDrawing =
()=>{

setDrawing(false);

};

const clearCanvas =
()=>{

const canvas =
canvasRef.current;

const ctx =
getContext();

if(
!canvas ||
!ctx
)
return;

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

};

const handleClear =
()=>{

clearCanvas();

socket.emit(
"whiteboard:clear",
boardId
);

};

return(

  <div>

   <div
    className="
    flex
    gap-4
    mb-4
    "
   >

<input
 type="color"
 value={color}
 onChange={
  (
   e
  )=>
  setColor(
   e.target.value
  )
 }
/>

<button
 onClick={
  handleClear
 }
 className="
 px-4
 py-2
 bg-red-500
 text-white
 rounded
 "
>
 Clear
</button>

   </div>

<canvas
ref={canvasRef}
width={1200}
height={700}
className="
border
rounded
bg-white
"
onMouseDown={
startDrawing
}
onMouseMove={
draw
}
onMouseUp={
stopDrawing
}
onMouseLeave={
stopDrawing
}
/>

  </div>

);

}
