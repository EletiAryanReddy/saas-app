
import cron
from "node-cron";

import Calendar
from "./calendar.model";

import {
getIO
}
from "../../services/socket/socket.service";

export const startCalendarReminder =
() => {

console.log(
"⏰ Calendar Reminder Service Started"
);

// Runs Every Minute

cron.schedule(
"* * * * *",
async () => {

try {

const now =
new Date();

const nextMinute =
new Date(
  now.getTime()
  +
  60 * 1000
);

const events =
await Calendar.find({

  startTime:{
    $gte:now,
    $lte:nextMinute
  }

});

const io =
getIO();

for(
  const event
  of events
){

  io.to(
    event.workspaceId
  ).emit(
    "calendar:reminder-notification",
    {

      eventId:
      event._id,

      title:
      event.title,

      description:
      event.description,

      startTime:
      event.startTime,

      participants:
      event.participants,

      reminder:
      event.reminder

    }
  );

  console.log(
    "Reminder Sent:",
    event.title
  );

}

} catch(error){

console.log(
  error
);

}

}
);

};
