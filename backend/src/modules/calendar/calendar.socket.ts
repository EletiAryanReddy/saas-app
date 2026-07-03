

import { Server }
from "socket.io";

export const registerCalendarSocket =
(
io:Server
) => {

io.on(
"connection",
(
socket
) => {

console.log(
"📅 Calendar Connected:",
socket.id
);

// Join Workspace Calendar

socket.on(
"calendar:join",
(
workspaceId:string
) => {

  socket.join(
    workspaceId
  );

  io.to(
    workspaceId
  ).emit(
    "calendar:user-joined",
    {
      socketId:
      socket.id
    }
  );

}


);

// Leave Calendar

socket.on(
"calendar:leave",
(
workspaceId:string
) => {

  socket.leave(
    workspaceId
  );

  io.to(
    workspaceId
  ).emit(
    "calendar:user-left",
    {
      socketId:
      socket.id
    }
  );

}


);

// Event Created

socket.on(
"calendar:create",
(
data:any
) => {


  io.to(
    data.workspaceId
  ).emit(
    "calendar:created",
    data
  );

}


);

// Event Updated

socket.on(
"calendar:update",
(
data:any
) => {

  io.to(
    data.workspaceId
  ).emit(
    "calendar:updated",
    data
  );

}


);

// Event Deleted

socket.on(
"calendar:delete",
(
data:any
) => {


  io.to(
    data.workspaceId
  ).emit(
    "calendar:deleted",
    data
  );

}


);

// Reminder Notification

socket.on(
"calendar:reminder",
(
data:any
) => {


  io.to(
    data.workspaceId
  ).emit(
    "calendar:reminder-notification",
    {

      title:
      data.title,

      startTime:
      data.startTime,

      reminder:
      data.reminder

    }
  );

}


);

// Participant Added

socket.on(
"calendar:add-participant",
(
data:any
) => {

  io.to(
    data.workspaceId
  ).emit(
    "calendar:participant-added",
    data
  );

}


);

// Participant Removed

socket.on(
"calendar:remove-participant",
(
data:any
) => {


  io.to(
    data.workspaceId
  ).emit(
    "calendar:participant-removed",
    data
  );

}


);

// Drag & Drop Event

socket.on(
"calendar:event-moved",
(
data:any
) => {


  io.to(
    data.workspaceId
  ).emit(
    "calendar:event-updated",
    data
  );

}


);

// Resize Event

socket.on(
"calendar:event-resized",
(
data:any
) => {


  io.to(
    data.workspaceId
  ).emit(
    "calendar:event-resized",
    data
  );

}


);

socket.on(
"disconnect",
() => {


  console.log(
    "📅 Calendar Disconnected:",
    socket.id
  );

}


);

}
);

};
