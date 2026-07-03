import { create }
from "zustand";

export const useInvitationStore =
create((set)=>({

 invitations:[],

 setInvitations:
 (data:any)=>
 set({
  invitations:data
 })

}));