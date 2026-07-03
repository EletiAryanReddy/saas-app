

"use client";

import EventCard
from "./EventCard";

interface Props {

events:any;

onEventClick?:(
event:any
)=>void;

}

export default function WeekView(
{
events,
onEventClick
}:Props
){

const today =
new Date();

const currentDay =
today.getDay();

const weekStart =
new Date(today);

weekStart.setDate(
today.getDate()

* currentDay
  );

const days =
[];

for(
let i=0;
i<7;
i++
){

const date =
new Date(
weekStart
);

date.setDate(
weekStart.getDate()
+ i
);

days.push(date);

}

const getEventsForDate =
(
date:Date
) => {

return events.filter(
(
event:any
) => {


const eventDate =
new Date(
  event.startTime
);

return (

  eventDate
  .toDateString()

  ===

  date
  .toDateString()

);


}
);

};

return(

  <div
   className="
   overflow-x-auto
   "
  >

   <div
    className="
    grid
    grid-cols-7
    gap-4
    "
   >


{
  days.map(
   (
    day,
    index
   )=>{

    const dayEvents =
    getEventsForDate(
      day
    );

    const isToday =

      day
      .toDateString()

      ===

      today
      .toDateString();

    return(

     <div

      key={index}

      className="
      border
      rounded-lg
      min-h-[500px]
      p-3
      bg-white
      "

     >

      <div
       className="
       mb-4
       text-center
       "
      >

       <div
        className="
        text-sm
        text-gray-500
        "
       >

        {
         day.toLocaleDateString(
          "en-US",
          {
           weekday:
           "short"
          }
         )
        }

       </div>

       <div

        className={

         isToday

         ?

         `
         mt-1
         w-8
         h-8
         mx-auto
         flex
         items-center
         justify-center
         rounded-full
         bg-blue-600
         text-white
         font-semibold
         `

         :

         `
         mt-1
         text-lg
         font-semibold
         `
        }

       >

        {
         day.getDate()
        }

       </div>

      </div>

      <div
       className="
       space-y-3
       "
      >

       {
        dayEvents.length > 0

        ?

        dayEvents.map(
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
         text-center
         text-gray-400
         text-sm
         pt-10
         "
        >

         No Events

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
