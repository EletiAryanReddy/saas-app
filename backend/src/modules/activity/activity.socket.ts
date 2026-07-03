

import { Server }
from "socket.io";

export const registerActivitySocket =
(io:Server)=>{

io.on(
"connection",
(socket)=>{

socket.on(
"activity:create",
(activity)=>{

  io.emit(
   "activity:created",
   activity
  );

}

);

}
);

};
