"use client";

import {
 useState
}
from "react";

import {
 useMeetingStore
}
from "@/store/meeting.store";

import {
 sendMessage
}
from "@/services/socket/meeting.socket";

export default function
ChatPanel(
{
 meetingId
}:{
 meetingId:string
}){

 const [text,setText] =
 useState("");

 const {
  messages
 }=
 useMeetingStore();

 const handleSend =
 ()=>{

  sendMessage(
   meetingId,
   {
    sender:"Aryan",
    text,
   }
  );

  setText("");
 };

 return(

  <div>

   {
    messages.map(
     (
      msg:any,
      i:number
     )=>(
      <p key={i}>
       <b>
        {msg.sender}
       </b>
       :
       {msg.text}
      </p>
     )
    )
   }

   <input
    value={text}
    onChange={(e)=>
     setText(
      e.target.value
     )
    }
   />

   <button
    onClick={
     handleSend
    }
   >
    Send
   </button>

  </div>

 );
}