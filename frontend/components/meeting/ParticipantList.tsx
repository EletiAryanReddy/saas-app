import {
 useMeetingStore
}
from "@/store/meeting.store";

export default function
ParticipantList(){

 const {
  participants
 }=
 useMeetingStore();

 return(

  <div>

   <h2>
    Participants
   </h2>

   {
    participants.map(
     (user:any)=>(
      <p
       key={user._id}
      >
       {user.name}
      </p>
     )
    )
   }

  </div>

 );
}