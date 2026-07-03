"use client";

import { useEffect }
from "react";

import InviteUser
from "@/components/invitation/InviteUser";

import InvitationList
from "@/components/invitation/InvitationList";

import {
 getInvitations
}
from "@/services/api/invitation.service";

import {
 useInvitationStore
}
from "@/store/invitation.store";

export default function InvitationsPage(){

 const {
  invitations,
  setInvitations
 } =
 useInvitationStore();

 useEffect(()=>{

  load();

 },[]);

 const load =
 async()=>{

  const res =
  await getInvitations(
   "6a2c2c86bd54aa6fdf34690a"
  );

  setInvitations(
   res.data
  );

 };

 return(

  <div>

   <h1>
    Invitations
   </h1>

   <InviteUser/>

   <InvitationList
    invitations={
     invitations
    }
   />

  </div>

 );

}