import { create }
from "zustand";

interface MeetingStore {

 participants:any[];

 messages:any[];

 addParticipant:
 (user:any)=>void;

 removeParticipant:
 (userId:string)=>void;

 addMessage:
 (message:any)=>void;
}

export const useMeetingStore =
create<MeetingStore>(
(set)=>({

 participants:[],

 messages:[],

 addParticipant:
 (user)=>
 set((state)=>({
  participants:[
   ...state.participants,
   user
  ]
 })),

 removeParticipant:
 (userId)=>
 set((state)=>({
  participants:
   state.participants.filter(
    p=>p._id!==userId
   )
 })),

 addMessage:
 (message)=>
 set((state)=>({
  messages:[
   ...state.messages,
   message
  ]
 }))
}));