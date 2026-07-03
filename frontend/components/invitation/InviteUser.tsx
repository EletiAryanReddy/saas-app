"use client";

import { useState }
from "react";

import {
 createInvitation
}
from "@/services/api/invitation.service";

export default function InviteUser(){

 const [email,setEmail] =
 useState("");

 const invite =
 async()=>{

  await createInvitation({

   workspaceId:
   "6a2c2c86bd54aa6fdf34690a",

   email,

   role:"MEMBER",

   invitedBy:
   "6a2c2bf8bd54aa6fdf346908"

  });

  alert("Invitation Sent");

 };

 return(

  <div>

   <input
    value={email}
    onChange={(e)=>
    setEmail(e.target.value)}
   />

   <button
    onClick={invite}
   >
    Invite
   </button>

  </div>

 );

}