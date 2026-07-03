
"use client";

interface WhiteboardToolbarProps {

selectedTool:string;

setSelectedTool:
(
tool:string
)=>void;

undo:()=>void;

redo:()=>void;

clearBoard:()=>void;

}

export default function WhiteboardToolbar(
{
selectedTool,
setSelectedTool,
undo,
redo,
clearBoard
}:WhiteboardToolbarProps
){

const tools = [

{
  name:"pen",
  label:"✏️ Pen"
},

{
  name:"rectangle",
  label:"▭ Rectangle"
},

{
  name:"circle",
  label:"◯ Circle"
},

{
  name:"arrow",
  label:"➜ Arrow"
},

{
  name:"text",
  label:"📝 Text"
},

{
  name:"eraser",
  label:"🧹 Eraser"
}

];

return(

<div
  className="
  flex
  flex-wrap
  gap-3
  p-4
  border
  rounded-lg
  bg-white
  shadow-sm
  mb-4
  "
>

  {
    tools.map(
      (
        tool
      )=>(
        <button

          key={
            tool.name
          }

          onClick={
            ()=>setSelectedTool(
              tool.name
            )
          }

          className={

            selectedTool ===
            tool.name

            ?

            `
            px-4
            py-2
            rounded
            bg-blue-600
            text-white
            `

            :

            `
            px-4
            py-2
            rounded
            border
            bg-gray-100
            hover:bg-gray-200
            `

          }

        >

          {
            tool.label
          }

        </button>
      )
    )
  }

  <div
    className="
    ml-auto
    flex
    gap-2
    "
  >

    <button

      onClick={undo}

      className="
      px-4
      py-2
      bg-yellow-500
      text-white
      rounded
      "

    >
      ↩ Undo
    </button>

    <button

      onClick={redo}

      className="
      px-4
      py-2
      bg-green-600
      text-white
      rounded
      "

    >
      ↪ Redo
    </button>

    <button

      onClick={clearBoard}

      className="
      px-4
      py-2
      bg-red-600
      text-white
      rounded
      "

    >
      🗑 Clear
    </button>

  </div>

</div>
);

}
