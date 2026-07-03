

import { Router }
from "express";

import {

createEventController,

getWorkspaceEventsController,

getEventController,

updateEventController,

deleteEventController,

createRecurringEventController,

getTodayEventsController,

getUpcomingEventsController,

getCalendarStatsController,

addParticipantController,

removeParticipantController,

searchEventsController

}
from "./calendar.controller";

const router =
Router();

router.post(
"/",
createEventController
);

router.get(
"/workspace/:workspaceId",
getWorkspaceEventsController
);

router.get(
"/today/:workspaceId",
getTodayEventsController
);

router.get(
"/upcoming/:workspaceId",
getUpcomingEventsController
);

router.get(
"/stats/:workspaceId",
getCalendarStatsController
);

router.get(
"/search/:workspaceId",
searchEventsController
);

router.post(
"/recurring",
createRecurringEventController
);

router.get(
"/:eventId",
getEventController
);

router.put(
"/:eventId",
updateEventController
);

router.delete(
"/:eventId",
deleteEventController
);

router.post(
"/:eventId/participants",
addParticipantController
);

router.delete(
"/:eventId/participants",
removeParticipantController
);

export default router;
