
import { Request,Response }
from "express";

import {
createActivity,
getWorkspaceActivities,
getUserActivities,
deleteActivity,
getActivityStats
}
from "./activity.service";

export const createActivityController =
async(req:Request,res:Response)=>{

const activity =
await createActivity(
req.body
);

res.json({
success:true,
activity
});

};

export const getWorkspaceActivitiesController =
async(req:Request,res:Response)=>{

const activities =
await getWorkspaceActivities(
String(req.params.workspaceId)
);

res.json(
activities
);

};

export const getUserActivitiesController =
async(req:Request,res:Response)=>{

const activities =
await getUserActivities(
String(req.params.userId)
);

res.json(
activities
);

};

export const deleteActivityController =
async(req:Request,res:Response)=>{

await deleteActivity(
String(req.params.activityId)
);

res.json({
success:true
});

};

export const getActivityStatsController =
async(req:Request,res:Response)=>{

const stats =
await getActivityStats(
String(req.params.workspaceId)
);

res.json(stats);

};



