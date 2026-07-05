
import { Request, Response }
from "express";

import {

createEvent,
getWorkspaceEvents,
getEventById,
updateEvent,
deleteEvent,

createRecurringEvent,

getTodayEvents,
getUpcomingEvents,

getCalendarStats,

addParticipant,
removeParticipant,

searchEvents

}
from "./calendar.service";

export const createEventController =
async (
req:Request,
res:Response
) => {

try {

const event =
await createEvent(
  req.body
);

res.json({
  success:true,
  event
});

} catch(error){

console.log(error);

res.status(500).json({
  success:false,
  message:
  "Create Event Failed"
});

}

};

export const getWorkspaceEventsController =
async (
req:Request,
res:Response
) => {

try {

const events =
await getWorkspaceEvents(
  String(req.params.workspaceId)
);

res.json(events);


} catch(error){

res.status(500).json({
  success:false,
  message:
  "Fetch Events Failed"
});

}

};

export const getEventController =
async (
req:Request,
res:Response
) => {

try {

const event =
await getEventById(
  String(req.params.eventId)
);

if(!event){

  return res.status(404).json({
    success:false,
    message:
    "Event Not Found"
  });

}

res.json(event);


} catch(error){

res.status(500).json({
  success:false,
  message:
  "Fetch Event Failed"
});

}

};

export const updateEventController =
async (
req:Request,
res:Response
) => {

try {

const event =
await updateEvent(
  String(req.params.eventId),
  req.body
);

res.json({
  success:true,
  event
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Update Event Failed"
});
}

};

export const deleteEventController =
async (
req:Request,
res:Response
) => {

try {

await deleteEvent(
  String(req.params.eventId)
);

res.json({
  success:true,
  message:
  "Event Deleted"
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Delete Event Failed"
});
}

};

export const createRecurringEventController =
async (
req:Request,
res:Response
) => {

try {

const event =
await createRecurringEvent(
  req.body
);

res.json({
  success:true,
  event
});

} catch(error){

res.status(500).json({
  success:false,
  message:
  "Recurring Event Failed"
});

}

};

export const getTodayEventsController =
async (
req:Request,
res:Response
) => {

try {

const events =
await getTodayEvents(
  String(req.params.workspaceId)
);

res.json(events);


} catch(error){

res.status(500).json({
  success:false
});

}

};

export const getUpcomingEventsController =
async (
req:Request,
res:Response
) => {

try {

const events =
await getUpcomingEvents(
  String(req.params.workspaceId)
);

res.json(events);

} catch(error){

res.status(500).json({
  success:false
});

}

};

export const getCalendarStatsController =
async (
req:Request,
res:Response
) => {

try {

const stats =
await getCalendarStats(
  String(req.params.workspaceId)
);

res.json(stats);

} catch(error){

res.status(500).json({
  success:false
});

}

};

export const addParticipantController =
async (
req:Request,
res:Response
) => {

try {

const event =
await addParticipant(

  String(req.params.eventId),

  req.body.userId

);

res.json({
  success:true,
  event
});

} catch(error){

res.status(500).json({
  success:false
});

}

};

export const removeParticipantController =
async (
req:Request,
res:Response
) => {

try {

const event =
await removeParticipant(

  String(req.params.eventId),

  req.body.userId

);

res.json({
  success:true,
  event
});

} catch(error){

res.status(500).json({
  success:false
});
}

};

export const searchEventsController =
async (
req:Request,
res:Response
) => {

try {

const events =
await searchEvents(

  String(req.params.workspaceId),

  req.query.keyword as string

);

res.json(events);


} catch(error){

res.status(500).json({
  success:false,
  message:
  "Search Failed"
});

}

};

