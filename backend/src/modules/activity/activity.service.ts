
import Activity
from "./activity.model";

export const createActivity =
async(data:any)=>{

return Activity.create(data);

};

export const getWorkspaceActivities =
async(workspaceId:string)=>{

return Activity.find({
workspaceId
})
.sort({
createdAt:-1
});

};

export const getUserActivities =
async(userId:string)=>{

return Activity.find({
userId
})
.sort({
createdAt:-1
});

};

export const deleteActivity =
async(id:string)=>{

return Activity.findByIdAndDelete(
id
);

};

export const getActivityStats =
async(workspaceId:string)=>{

const total =
await Activity.countDocuments({
workspaceId
});

return {
totalActivities:total
};

};
