

"use client";

import {
useState
}
from "react";

import {
createEvent,
updateEvent
}
from "@/services/api/calendar.service";

interface Props {

workspaceId:string;

event?:any;

onSuccess?:()=>void;

}

export default function EventForm(
{
workspaceId,
event,
onSuccess
}:Props
){

const [title,
setTitle] =
useState(
event?.title || ""
);

const [
description,
setDescription
] =
useState(
event?.description || ""
);

const [
startTime,
setStartTime
] =
useState(
event?.startTime
?
event.startTime
.slice(0,16)
:
""
);

const [
endTime,
setEndTime
] =
useState(
event?.endTime
?
event.endTime
.slice(0,16)
:
""
);

const [
reminder,
setReminder
] =
useState(
event?.reminder || 15
);

const [
color,
setColor
] =
useState(
event?.color ||
"#2563eb"
);

const [
participants,
setParticipants
] =
useState("");

const handleSubmit =
async (
e:any
)=>{

e.preventDefault();

const payload = {

workspaceId,

title,

description,

startTime,

endTime,

reminder,

color,

participants:

participants
?
participants
.split(",")
.map(
p=>p.trim()
)
:
[],

createdBy:
"6a2c2bf8bd54aa6fdf346908"

};

try{

if(event){


await updateEvent(
  event._id,
  payload
);


}else{

await createEvent(
  payload
);


}

alert(
event
?
"Event Updated"
:
"Event Created"
);

onSuccess?.();

}catch(error){

console.log(error);

alert(
"Operation Failed"
);

}

};

return(

  <form

onSubmit={
handleSubmit
}

className="
bg-white
p-6
rounded-lg
shadow
space-y-4
"

>

   <h2
    className="
    text-xl
    font-semibold
    "
   >


{
  event
  ?
  "Edit Event"
  :
  "Create Event"
}


   </h2>

<input


type="text"

placeholder="Title"

value={title}

onChange={
 e=>
 setTitle(
  e.target.value
 )
}

className="
w-full
border
p-2
rounded
"

required


/>

   <textarea

    placeholder="Description"

    value={description}

    onChange={
     e=>
     setDescription(
      e.target.value
     )
    }

    className="
    w-full
    border
    p-2
    rounded
    "

   />

   <div
    className="
    grid
    grid-cols-2
    gap-4
    "
   >

    <input

     type="datetime-local"

     value={startTime}

     onChange={
      e=>
      setStartTime(
       e.target.value
      )
     }

     className="
     border
     p-2
     rounded
     "

     required

    />

    <input

     type="datetime-local"

     value={endTime}

     onChange={
      e=>
      setEndTime(
       e.target.value
      )
     }

     className="
     border
     p-2
     rounded
     "

     required

    />

   </div>

   <input

    type="text"

    placeholder="
    Participants IDs
    comma separated
    "

    value={
      participants
    }

    onChange={
      e=>
      setParticipants(
       e.target.value
      )
    }

    className="
    w-full
    border
    p-2
    rounded
    "

   />

   <div
    className="
    grid
    grid-cols-2
    gap-4
    "
   >

    <select

     value={reminder}

     onChange={
      e=>
      setReminder(
       Number(
        e.target.value
       )
      )
     }

     className="
     border
     p-2
     rounded
     "

    >

     <option value={5}>
      5 Minutes
     </option>

     <option value={15}>
      15 Minutes
     </option>

     <option value={30}>
      30 Minutes
     </option>

     <option value={60}>
      1 Hour
     </option>

    </select>

    <input

     type="color"

     value={color}

     onChange={
      e=>
      setColor(
       e.target.value
      )
     }

     className="
     h-10
     "

    />

   </div>

   <button

    type="submit"

    className="
    w-full
    bg-blue-600
    text-white
    py-2
    rounded
    "

   >

    {
      event
      ?
      "Update Event"
      :
      "Create Event"
    }

   </button>

  </form>

 );

}
