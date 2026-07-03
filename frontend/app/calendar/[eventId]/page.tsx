

"use client";

import { useEffect, useState }
from "react";

import { useParams }
from "next/navigation";

import Link
from "next/link";

import EventForm
from "@/components/calendar/EventForm";

import {
getEvent,
deleteEvent
}
from "@/services/api/calendar.service";

export default function EventDetailsPage(){

const params =
useParams();

const eventId =
params.eventId as string;

const [
event,
setEvent
] =
useState<any>(
null
);

const [
loading,
setLoading
] =
useState(true);

const [
editMode,
setEditMode
] =
useState(false);

const loadEvent =
async () => {

try{

const res =
await getEvent(
eventId
);

setEvent(
res.data
);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

};

useEffect(()=>{

if(eventId){

loadEvent();

}

},[eventId]);

const handleDelete =
async () => {

const confirmDelete =
window.confirm(
"Delete this event?"
);

if(
!confirmDelete
) return;

try{

await deleteEvent(
eventId
);

window.location.href =
"/calendar";

}catch(error){

console.log(error);

alert(
"Delete Failed"
);

}

};

if(loading){

return(

   <div
    className="
    p-10
    text-center
    "
   >

```
Loading Event...
```

   </div>

);

}

if(!event){

return(

   <div
    className="
    p-10
    text-center
    "
   >


Event Not Found


   </div>

);

}

return(

  <div
   className="
   p-6
   bg-gray-100
   min-h-screen
   "
  >

   <div
    className="
    mb-4
    "
   >


<Link

 href="/calendar"

 className="
 text-blue-600
 "

>

 ← Back To Calendar

</Link>


   </div>

{
editMode


?

<EventForm

 workspaceId={
  event.workspaceId
 }

 event={event}

 onSuccess={()=>{
  setEditMode(
   false
  );
  loadEvent();
 }}

/>

:

<div
 className="
 bg-white
 rounded-lg
 shadow
 p-6
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

  <h1
   className="
   text-3xl
   font-bold
   "
  >

   {event.title}

  </h1>

  <div
   className="
   flex
   gap-2
   "
  >

   <button

    onClick={()=>
     setEditMode(
      true
     )
    }

    className="
    px-4
    py-2
    bg-yellow-500
    text-white
    rounded
    "

   >

    Edit

   </button>

   <button

    onClick={
     handleDelete
    }

    className="
    px-4
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

 <div
  className="
  space-y-4
  "
 >

  <div>

   <strong>
    Description:
   </strong>

   <p>
    {
     event.description
    }
   </p>

  </div>

  <div>

   <strong>
    Start:
   </strong>

   <p>

    {
     new Date(
      event.startTime
     )
     .toLocaleString()
    }

   </p>

  </div>

  <div>

   <strong>
    End:
   </strong>

   <p>

    {
     new Date(
      event.endTime
     )
     .toLocaleString()
    }

   </p>

  </div>

  <div>

   <strong>
    Reminder:
   </strong>

   <p>

    {
     event.reminder
    }
    Minutes Before

   </p>

  </div>

  <div>

   <strong>
    Recurrence:
   </strong>

   <p>

    {
     event.recurrence
     ||
     "NONE"
    }

   </p>

  </div>

  <div>

   <strong>
    Participants:
   </strong>

   <ul
    className="
    list-disc
    ml-6
    "
   >

    {
     event.participants
     ?.length > 0

     ?

     event.participants.map(
      (
       user:any,
       index:number
      )=>(

       <li
        key={index}
       >

        {user}

       </li>

      )
     )

     :

     <li>
      No Participants
     </li>

    }

   </ul>

  </div>

  <div>

   <strong>
    Created By:
   </strong>

   <p>

    {
     event.createdBy
    }

   </p>

  </div>

 </div>

</div>


}

  </div>

);

}
