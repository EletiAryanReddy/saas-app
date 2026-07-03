import MeetingRoom
from "@/components/meeting/MeetingRoom";

import ChatPanel
from "@/components/meeting/ChatPanel";

import ParticipantList
from "@/components/meeting/ParticipantList";

export default function
MeetingPage(
{
 params
}:any
){

 return(

  <div
   className="
   grid
   grid-cols-4
   gap-4"
  >

   <div
    className="
    col-span-3"
   >

    <MeetingRoom />

   </div>

   <div>

    <ParticipantList />

    <ChatPanel
     meetingId={
      params.meetingId
     }
    />

   </div>

  </div>

 );
}