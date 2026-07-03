"use client";

import {
 useEffect,
 useState
}
from "react";

import VideoGrid
from "./VideoGrid";

import Controls
from "./Controls";

export default function
MeetingRoom(){

 const [
  streams,
  setStreams
 ]=useState<
 MediaStream[]
 >([]);

 useEffect(()=>{

  navigator
   .mediaDevices
   .getUserMedia({
    video:true,
    audio:true,
   })
   .then((stream)=>{

    setStreams([
     stream
    ]);

   });

 },[]);

 return(

  <div>

   <VideoGrid
    streams={
     streams
    }
   />

   <Controls
    mute={()=>{}}
    camera={()=>{}}
    leave={()=>{}}
   />

  </div>

 );
}