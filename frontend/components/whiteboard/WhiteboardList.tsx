
"use client";

import Link from "next/link";

interface WhiteboardListProps {

boards:any;

onDelete:
(
boardId:string
)=>void;

onDuplicate:
(
boardId:string
)=>void;

}

export default function WhiteboardList(
{
boards,
onDelete,
onDuplicate
}:WhiteboardListProps
){

return(

<div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
  "
>

  {
    boards?.map(
      (
        board:any
      )=>(

        <div

          key={
            board._id
          }

          className="
          border
          rounded-lg
          p-4
          bg-white
          shadow-sm
          "

        >

          <h2
            className="
            text-lg
            font-semibold
            mb-2
            "
          >
            {board.title}
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            mb-3
            "
          >
            Elements:
            {" "}
            {
              board.elements
              ?.length || 0
            }
          </p>

          <p
            className="
            text-xs
            text-gray-400
            mb-4
            "
          >
            Created:
            {" "}
            {
              new Date(
                board.createdAt
              )
              .toLocaleString()
            }
          </p>

          <div
            className="
            flex
            flex-wrap
            gap-2
            "
          >

            <Link
              href={
                `/whiteboard/${board._id}`
              }
            >
              <button
                className="
                px-3
                py-2
                bg-blue-600
                text-white
                rounded
                "
              >
                Open
              </button>
            </Link>

            <button

              onClick={
                ()=>onDuplicate(
                  board._id
                )
              }

              className="
              px-3
              py-2
              bg-green-600
              text-white
              rounded
              "

            >
              Duplicate
            </button>

            <button

              onClick={
                ()=>onDelete(
                  board._id
                )
              }

              className="
              px-3
              py-2
              bg-red-600
              text-white
              rounded
              "

            >
              Delete
            </button>

          </div>

        </div>

      )
    )
  }

  {
    boards?.length === 0 && (

      <div
        className="
        col-span-full
        text-center
        text-gray-500
        py-10
        "
      >

        No Whiteboards Found

      </div>

    )
  }

</div>

);

}
