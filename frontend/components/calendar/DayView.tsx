

"use client";

import EventCard
from "./EventCard";

interface Props {

events:any;

onEventClick?:(
event:any
)=>void;

}

export default function DayView(
{
events,
onEventClick
}:Props
){

const today =
new Date();

const todayEvents =
events.filter(
(
event:any
)=>{

const eventDate =
new Date(
event.startTime
);

return (


eventDate
.toDateString()

===

today
.toDateString()


);

}
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

const getEventsForHour =
(
hour:number
) => {

return todayEvents.filter(
(
event:any
)=>{


const start =
new Date(
  event.startTime
);

return (
  start.getHours()
  ===
  hour
);


}
);

};

const currentHour =
today.getHours();

return(

  <div
   className="
   bg-white
   rounded-lg
   border
   overflow-hidden
   "
  >

   <div
    className="
    p-4
    border-b
    "
   >


<h2
 className="
 text-xl
 font-semibold
 "
>
 Today Schedule
</h2>

<p
 className="
 text-sm
 text-gray-500
 "
>
 {
  today.toDateString()
 }
</p>


   </div>

   <div
    className="
    max-h-[800px]
    overflow-y-auto
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

    const isCurrentHour =
    currentHour ===
    hour;

    return(

     <div

      key={hour}

      className="
      flex
      border-b
      min-h-[90px]
      "

     >

      <div

       className={

        isCurrentHour

        ?

        `
        w-24
        border-r
        bg-blue-50
        p-3
        font-semibold
        text-blue-600
        `

        :

        `
        w-24
        border-r
        p-3
        text-gray-500
        `
       }

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
       space-y-2
       "
      >

       {
        hourEvents.length > 0

        ?

        hourEvents.map(
         (
          event:any
         )=>(

          <EventCard

           key={
            event._id
           }

           event={
            event
           }

           onClick={
            onEventClick
           }

          />

         )
        )

        :

        <div
         className="
         text-gray-300
         text-sm
         h-full
         flex
         items-center
         "
        >
         —
        </div>

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
