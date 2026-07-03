"use client";

import {
 useEffect,
 useState
}
from "react";

import {
 getWorkspaceMeetings
}
from "@/services/api/meeting.service";

export default function
MeetingsPage(){

 const [
  meetings,
  setMeetings
 ]=useState([]);

 useEffect(()=>{

  loadMeetings();

 },[]);

 const loadMeetings =
 async()=>{

  const res =
   await getWorkspaceMeetings(
    "6a2c2c86bd54aa6fdf34690a"
   );

  setMeetings(
   res.data
  );
 };

 return(

  <div>

   <h1>
    Meetings
   </h1>

   {
    meetings.map(
     (m:any)=>(
      <div
       key={m._id}
      >
       {m.title}
      </div>
     )
    )
   }

  </div>

 );
}