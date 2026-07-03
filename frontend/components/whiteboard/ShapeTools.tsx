
"use client";

interface ShapeToolsProps {

selectedShape:string;

onSelectShape:
(
shape:string
)=>void;

}

export default function ShapeTools(
{
selectedShape,
onSelectShape
}:ShapeToolsProps
){

const shapes = [

{
  value:"line",
  label:"📏 Line"
},

{
  value:"rectangle",
  label:"▭ Rectangle"
},

{
  value:"circle",
  label:"◯ Circle"
},

{
  value:"arrow",
  label:"➜ Arrow"
},

{
  value:"text",
  label:"📝 Text"
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
  "
>

  <h3
    className="
    font-semibold
    w-full
    mb-2
    "
  >
    Shape Tools
  </h3>

  {
    shapes.map(
      (
        shape
      )=>(

        <button

          key={
            shape.value
          }

          onClick={
            ()=>onSelectShape(
              shape.value
            )
          }

          className={

            selectedShape ===
            shape.value

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
            shape.label
          }

        </button>

      )
    )
  }

</div>

);

}
