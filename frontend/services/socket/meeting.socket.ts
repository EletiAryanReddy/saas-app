import { io } from "socket.io-client";

export const socket = io(
  "http://localhost:5000"
);

export const joinMeeting =
(
  meetingId:string,
  userId:string
)=>{
 socket.emit(
  "join-meeting",
  {
   meetingId,
   userId,
  }
 );
};

export const sendMessage =
(
 meetingId:string,
 message:any
)=>{
 socket.emit(
  "meeting-message",
  {
   meetingId,
   ...message,
  }
 );
};