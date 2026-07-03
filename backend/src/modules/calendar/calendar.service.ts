

import Calendar
from "./calendar.model";

export const createEvent =
async (
data:any
) => {

return await Calendar.create(
data
);

};

export const getWorkspaceEvents =
async (
workspaceId:string
) => {

return await Calendar.find({
workspaceId
})
.sort({
startTime:1
});

};

export const getEventById =
async (
eventId:string
) => {

return await Calendar.findById(
eventId
);

};

export const updateEvent =
async (
eventId:string,
updateData:any
) => {

return await Calendar.findByIdAndUpdate(
eventId,
updateData,
{
returnDocument:"after"
}
);

};

export const deleteEvent =
async (
eventId:string
) => {

return await Calendar.findByIdAndDelete(
eventId
);

};

export const createRecurringEvent =
async (
data:any
) => {

return await Calendar.create({

...data,

recurrence:
data.recurrence ||
"WEEKLY"


});

};

export const getTodayEvents =
async (
workspaceId:string
) => {

const today =
new Date();

const start =
new Date(
today.setHours(
0,0,0,0
)
);

const end =
new Date(
today.setHours(
23,59,59,999
)
);

return await Calendar.find({

workspaceId,

startTime:{
  $gte:start,
  $lte:end
}


});

};

export const getUpcomingEvents =
async (
workspaceId:string
) => {

const now =
new Date();

return await Calendar.find({

workspaceId,

startTime:{
  $gte:now
}


})
.sort({
startTime:1
})
.limit(20);

};

export const getCalendarStats =
async (
workspaceId:string
) => {

const totalEvents =
await Calendar.countDocuments({
workspaceId
});

const todayEvents =
(
await getTodayEvents(
workspaceId
)
).length;

const upcomingEvents =
(
await getUpcomingEvents(
workspaceId
)
).length;

return {


totalEvents,

todayEvents,

upcomingEvents


};

};

export const getEventsByDateRange =
async (
workspaceId:string,
startDate:string,
endDate:string
) => {

return await Calendar.find({


workspaceId,

startTime:{
  $gte:new Date(
    startDate
  ),
  $lte:new Date(
    endDate
  )
}


});

};

export const addParticipant =
async (
eventId:string,
userId:string
) => {

return await Calendar.findByIdAndUpdate(


eventId,

{
  $addToSet:{
    participants:userId
  }
},

{
  returnDocument:"after"
}


);

};

export const removeParticipant =
async (
eventId:string,
userId:string
) => {

return await Calendar.findByIdAndUpdate(

eventId,

{
  $pull:{
    participants:userId
  }
},

{
  returnDocument:"after"
}


);

};

export const searchEvents =
async (
workspaceId:string,
keyword:string
) => {

return await Calendar.find({


workspaceId,

title:{
  $regex:keyword,
  $options:"i"
}


});

};

export const getReminderEvents =
async () => {

const now =
new Date();

const nextHour =
new Date(
now.getTime() +
60 * 60 * 1000
);

return await Calendar.find({

startTime:{
  $gte:now,
  $lte:nextHour
}


});

};
