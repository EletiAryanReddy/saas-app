

"use client";

import {
useEffect,
useState
}
from "react";

interface Props {

events:any;

}

export default function ReminderPanel(
{
events
}:Props
){

const [
upcomingEvents,
setUpcomingEvents
] =
useState<any[]>(
[]
);

useEffect(()=>{

const now =
new Date();

const upcoming =
events.filter(
(
event:any
)=>{


const start =
new Date(
  event.startTime
);

return start > now;


}
)
.sort(
(
a:any,
b:any
)=>

new Date(
a.startTime
).getTime()

*

new Date(
b.startTime
).getTime()

)
.slice(0,10);

setUpcomingEvents(
upcoming
);

},[events]);

const formatDate =
(
date:string
) => {

return new Date(
date
).toLocaleString();

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

   <div
    className="
    flex
    justify-between
    items-center
    mb-4
    "
   >


<h2
 className="
 text-lg
 font-semibold
 "
>
 🔔 Upcoming Reminders
</h2>

<span
 className="
 text-sm
 text-gray-500
 "
>
 {
  upcomingEvents.length
 }
 Events
</span>


   </div>

{
upcomingEvents.length === 0


?

<div
 className="
 text-center
 text-gray-400
 py-8
 "
>

 No Upcoming Reminders

</div>

:

<div
 className="
 space-y-3
 "
>

 {
  upcomingEvents.map(
   (
    event:any
   )=>(

    <div

     key={
      event._id
     }

     className="
     border
     rounded-lg
     p-3
     "

    >

     <div
      className="
      flex
      justify-between
      items-center
      "
     >

      <h3
       className="
       font-medium
       "
      >
       {
        event.title
       }
      </h3>

      <span
       className="
       text-xs
       bg-orange-100
       text-orange-600
       px-2
       py-1
       rounded
       "
      >

       ⏰
       {
        event.reminder
       }
       min

      </span>

     </div>

     <p
      className="
      text-sm
      text-gray-500
      mt-1
      "
     >

      {
        formatDate(
         event.startTime
        )
      }

     </p>

     {
      event.description
      &&

      <p
       className="
       text-sm
       mt-2
       "
      >

       {
        event.description
       }

      </p>

     }

     <div
      className="
      mt-2
      text-xs
      text-gray-400
      "
     >

      👥
      {
        event.participants
        ?.length || 0
      }
      Participants

     </div>

    </div>

   )
  )
 }

</div>


}

  </div>

);

}
