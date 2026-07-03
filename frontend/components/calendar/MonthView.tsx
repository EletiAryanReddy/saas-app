

"use client";

import EventCard
from "./EventCard";

interface Props {

events:any;

onEventClick?:(
event:any
)=>void;

}

export default function MonthView(
{
events,
onEventClick
}:Props
){

const today =
new Date();

const year =
today.getFullYear();

const month =
today.getMonth();

const firstDay =
new Date(
year,
month,
1
);

const lastDay =
new Date(
year,
month + 1,
0
);

const totalDays =
lastDay.getDate();

const startWeekDay =
firstDay.getDay();

const cells = [];

for(
let i=0;
i<startWeekDay;
i++
){

cells.push(null);

}

for(
let day=1;
day<=totalDays;
day++
){

cells.push(day);

}

const getEventsForDay =
(
day:number
) => {

return events.filter(
(
event:any
) => {


const date =
new Date(
  event.startTime
);

return (

  date.getDate()
  === day

  &&

  date.getMonth()
  === month

  &&

  date.getFullYear()
  === year

);


}
);

};

const weekDays = [

"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"

];

return(

  <div>

   <div
    className="
    grid
    grid-cols-7
    gap-2
    mb-2
    "
   >

{
  weekDays.map(
   day => (

    <div

     key={day}

     className="
     text-center
     font-semibold
     p-2
     bg-gray-100
     rounded
     "

    >
     {day}
    </div>

   )
  )
}


   </div>

   <div
    className="
    grid
    grid-cols-7
    gap-2
    "
   >


{
  cells.map(
   (
    day,
    index
   ) => {

    if(!day){

     return(

      <div

       key={index}

       className="
       min-h-[120px]
       border
       rounded
       bg-gray-50
       "

      />

     );

    }

    const dayEvents =
    getEventsForDay(
      day
    );

    const isToday =

      day ===
      today.getDate()

      &&

      month ===
      today.getMonth()

      &&

      year ===
      today.getFullYear();

    return(

     <div

      key={index}

      className="
      border
      rounded
      p-2
      min-h-[120px]
      bg-white
      overflow-hidden
      "

     >

      <div
       className="
       flex
       justify-between
       items-center
       mb-2
       "
      >

       <span

        className={

         isToday

         ?

         `
         bg-blue-600
         text-white
         px-2
         py-1
         rounded-full
         text-xs
         `

         :

         `
         text-sm
         font-medium
         `
        }

       >

        {day}

       </span>

      </div>

      <div
       className="
       space-y-2
       "
      >

       {
        dayEvents
        .slice(0,3)
        .map(
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
       }

       {
        dayEvents.length > 3
        &&

        <div
         className="
         text-xs
         text-blue-600
         font-medium
         "
        >

         +
         {
          dayEvents.length
          - 3
         }
         more

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
