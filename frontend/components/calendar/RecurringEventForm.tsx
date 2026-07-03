

"use client";

import {
useState
}
from "react";

import {
createRecurringEvent
}
from "@/services/api/calendar.service";

interface Props {

workspaceId:string;

onSuccess?:()=>void;

}

export default function RecurringEventForm(
{
workspaceId,
onSuccess
}:Props
){

const [
title,
setTitle
] =
useState("");

const [
description,
setDescription
] =
useState("");

const [
startTime,
setStartTime
] =
useState("");

const [
endTime,
setEndTime
] =
useState("");

const [
recurrence,
setRecurrence
] =
useState(
"DAILY"
);

const [
reminder,
setReminder
] =
useState(15);

const [
color,
setColor
] =
useState(
"#2563eb"
);

const [
loading,
setLoading
] =
useState(false);

const handleSubmit =
async (
e:any
) => {

e.preventDefault();

try{

setLoading(true);

await createRecurringEvent({


workspaceId,

title,

description,

startTime,

endTime,

recurrence,

reminder,

color,

participants:[],

createdBy:
"6a2c2bf8bd54aa6fdf346908"


});

alert(
"Recurring Event Created"
);

setTitle("");
setDescription("");
setStartTime("");
setEndTime("");

onSuccess?.();

}catch(error){

console.log(error);

alert(
"Failed To Create Event"
);

}finally{

setLoading(false);

}

};

return(

  <form

onSubmit={
handleSubmit
}

className="
bg-white
rounded-lg
shadow
border
p-6
space-y-4
"

>

   <h2
    className="
    text-xl
    font-semibold
    "
   >


🔁 Recurring Event


   </h2>

<input


type="text"

placeholder="Event Title"

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
rounded
p-2
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
    rounded
    p-2
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
     rounded
     p-2
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
     rounded
     p-2
     "

     required

    />

   </div>

   <select

    value={recurrence}

    onChange={
     e=>
     setRecurrence(
      e.target.value
     )
    }

    className="
    w-full
    border
    rounded
    p-2
    "

   >

    <option value="DAILY">
     Daily
    </option>

    <option value="WEEKLY">
     Weekly
    </option>

    <option value="MONTHLY">
     Monthly
    </option>

    <option value="YEARLY">
     Yearly
    </option>

   </select>

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
     rounded
     p-2
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

    disabled={loading}

    className="
    w-full
    bg-green-600
    text-white
    rounded
    py-2
    "

   >

    {
      loading
      ?
      "Creating..."
      :
      "Create Recurring Event"
    }

   </button>

  </form>

 );

}
