
import { Server } from "socket.io";

export const registerAutomationSocket =
(io:Server)=>{

io.on(
"connection",
(socket)=>{

socket.on(
"automation:create",
(data)=>{

  io.emit(
    "automation:created",
    data
  );

}

);

}
);

};

