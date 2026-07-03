import { Server }
from "socket.io";

export const commentSocket =
(io:Server)=>{

 io.on(
 "connection",
 socket=>{

  socket.on(
  "new-comment",
  data=>{

   io.emit(
   "comment-added",
   data
   );

  });

 });

};