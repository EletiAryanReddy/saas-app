
"use client";

interface ColorPickerProps {

color:string;

setColor:
(
color:string
)=>void;

strokeWidth:number;

setStrokeWidth:
(
width:number
)=>void;

backgroundColor:string;

setBackgroundColor:
(
color:string
)=>void;

}

export default function ColorPicker(
{
color,
setColor,
strokeWidth,
setStrokeWidth,
backgroundColor,
setBackgroundColor
}:ColorPickerProps
){

const presetColors = [

"#000000",
"#ff0000",
"#00ff00",
"#0000ff",
"#ffff00",
"#ff00ff",
"#00ffff",
"#808080"
];

return(

<div
  className="
  border
  rounded-lg
  p-4
  bg-white
  shadow-sm
  "
>

  <h3
    className="
    font-semibold
    mb-4
    "
  >
    Color Settings
  </h3>

  <div
    className="
    mb-4
    "
  >

    <label
      className="
      block
      mb-2
      text-sm
      "
    >
      Drawing Color
    </label>

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
      className="
      w-16
      h-10
      "
    />

  </div>

  <div
    className="
    flex
    flex-wrap
    gap-2
    mb-4
    "
  >

    {
      presetColors.map(
        (
          c
        )=>(

          <button

            key={c}

            onClick={
              ()=>setColor(c)
            }

            className="
            w-8
            h-8
            rounded-full
            border-2
            "

            style={{
              backgroundColor:c
            }}

          />

        )
      )
    }

  </div>

  <div
    className="
    mb-4
    "
  >

    <label
      className="
      block
      mb-2
      text-sm
      "
    >
      Stroke Width
    </label>

    <input
      type="range"
      min={1}
      max={20}
      value={strokeWidth}
      onChange={
        (
          e
        )=>
        setStrokeWidth(
          Number(
            e.target.value
          )
        )
      }
      className="
      w-full
      "
    />

    <p
      className="
      text-sm
      text-gray-500
      mt-1
      "
    >
      {strokeWidth}px
    </p>

  </div>

  <div>

    <label
      className="
      block
      mb-2
      text-sm
      "
    >
      Background Color
    </label>

    <input
      type="color"
      value={backgroundColor}
      onChange={
        (
          e
        )=>
        setBackgroundColor(
          e.target.value
        )
      }
      className="
      w-16
      h-10
      "
    />

  </div>

</div>

);

}
