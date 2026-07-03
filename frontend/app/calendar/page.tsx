

"use client";

import { useEffect, useState }
from "react";

import CalendarView
from "@/components/calendar/CalendarView";

import EventForm
from "@/components/calendar/EventForm";

import ReminderPanel
from "@/components/calendar/ReminderPanel";

import RecurringEventForm
from "@/components/calendar/RecurringEventForm";

import DragDropScheduler
from "@/components/calendar/DragDropScheduler";

import {
getWorkspaceEvents
}
from "@/services/api/calendar.service";

export default function CalendarPage(){

const workspaceId =
"6a2c2c86bd54aa6fdf34690a";

const [
events,
setEvents
] =
useState<any[]>(
[]
);

const [
loading,
setLoading
] =
useState(true);

const [
selectedEvent,
setSelectedEvent
] =
useState<any>(
null
);

const loadEvents =
async () => {

try{

const res =
await getWorkspaceEvents(
workspaceId
);

setEvents(
res.data
);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

};

useEffect(()=>{

loadEvents();

},[]);

if(loading){

return(

   <div
    className="
    p-10
    text-center
    "
   >


Loading Calendar...


   </div>

);

}

return(

  <div
   className="
   p-6
   space-y-6
   bg-gray-100
   min-h-screen
   "
  >

   <div
    className="
    flex
    justify-between
    items-center
    "
   >


<h1
 className="
 text-3xl
 font-bold
 "
>

 📅 Calendar Dashboard

</h1>


   </div>

   <div
    className="
    grid
    lg:grid-cols-3
    gap-6
    "
   >


<div
 className="
 lg:col-span-2
 "
>

 <CalendarView

  events={events}

  onEventClick={
   (
    event
   )=>{

    setSelectedEvent(
     event
    );

   }
  }

 />

</div>

<div
 className="
 space-y-6
 "
>

 <ReminderPanel
  events={events}
 />

</div>


   </div>

   <div
    className="
    grid
    lg:grid-cols-2
    gap-6
    "
   >


<EventForm

 workspaceId={
  workspaceId
 }

 event={
  selectedEvent
 }

 onSuccess={
  loadEvents
 }

/>

<RecurringEventForm

 workspaceId={
  workspaceId
 }

 onSuccess={
  loadEvents
 }

/>


   </div>

<DragDropScheduler


events={events}

onRefresh={
  loadEvents
}


/>

  </div>

);

}
