

"use client";

import {
useState
}
from "react";

import {
updateEvent
}
from "@/services/api/calendar.service";

interface Props {

events:any;

onRefresh?:()=>void;

}

export default function DragDropScheduler(
{
events,
onRefresh
}:Props
){

const [
draggedEvent,
setDraggedEvent
] =
useState<any>(
null
);

const hours =
Array.from(
{
length:24
},
(
_,
i
)=>i
);

const handleDragStart =
(
event:any
) => {

setDraggedEvent(
event
);

};

const handleDrop =
async (
hour:number
) => {

if(
!draggedEvent
) return;

try{

const start =
new Date(
draggedEvent.startTime
);

const end =
new Date(
draggedEvent.endTime
);

const duration =

end.getTime()

*

start.getTime();

const newStart =
new Date(start);

newStart.setHours(
hour
);

const newEnd =
new Date(
newStart.getTime()
+
duration
);

await updateEvent(


draggedEvent._id,

{

 startTime:
 newStart,

 endTime:
 newEnd

}


);

setDraggedEvent(
null
);

onRefresh?.();

}catch(error){

console.log(error);

alert(
"Move Failed"
);

}

};

const getEventsForHour =
(
hour:number
) => {

return events.filter(
(
event:any
)=>{

const date =
new Date(
  event.startTime
);

return (
  date.getHours()
  ===
  hour
);


}
);

};

return(

  <div
   className="
   bg-white
   rounded-lg
   shadow
   border
   p-4
   "
  >

   <h2
    className="
    text-xl
    font-semibold
    mb-4
    "
   >

```
📅 Drag & Drop Scheduler
```

   </h2>

   <div
    className="
    space-y-2
    "
   >


{
  hours.map(
   (
    hour
   )=>{

    const hourEvents =
    getEventsForHour(
      hour
    );

    return(

     <div

      key={hour}

      onDragOver={
       (
        e
       )=>
       e.preventDefault()
      }

      onDrop={
       ()=>handleDrop(
         hour
       )
      }

      className="
      flex
      border
      rounded
      min-h-[70px]
      "

     >

      <div
       className="
       w-24
       border-r
       p-3
       font-medium
       bg-gray-50
       "
      >

       {
        hour
        .toString()
        .padStart(
          2,
          "0"
        )
       }
       :00

      </div>

      <div
       className="
       flex-1
       p-2
       flex
       flex-wrap
       gap-2
       "
      >

       {
        hourEvents.map(
         (
          event:any
         )=>(

          <div

           key={
            event._id
           }

           draggable

           onDragStart={
            ()=>handleDragStart(
              event
            )
           }

           className="
           px-3
           py-2
           rounded
           text-white
           cursor-move
           text-sm
           "

           style={{
            background:
            event.color
            ||
            "#2563eb"
           }}

          >

           {event.title}

          </div>

         )
        )
       }

      </div>

     </div>

    );

   }
  )
}


   </div>

  </div>

);

}
