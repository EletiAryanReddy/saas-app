"use client";

import {
 acceptInvitation
}
from "@/services/api/invitation.service";

export default function AcceptInvite(
{
 inviteId
}:any
){

 const accept =
 async()=>{

  await acceptInvitation(
   inviteId
  );

  alert("Accepted");

 };

 return(
  <button
   onClick={accept}
  >
   Accept
  </button>
 );

}