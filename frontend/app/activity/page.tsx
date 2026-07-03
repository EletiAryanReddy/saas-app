"use client";

import { useEffect }
from "react";

import ActivityTimeline
from "@/components/activity/ActivityTimeline";

import ActivityStats
from "@/components/activity/ActivityStats";

import {
getWorkspaceActivities,
getActivityStats
}
from "@/services/api/activity.service";

import {
useActivityStore
}
from "@/store/activity.store";

export default function ActivityPage(){

const {
activities,
stats,
setActivities,
setStats
} =
useActivityStore();

useEffect(()=>{

load();

},[]);

const load =
async()=>{

const activityRes =
await getWorkspaceActivities(
"6a2c2c86bd54aa6fdf34690a"
);

setActivities(
activityRes.data
);

const statsRes =
await getActivityStats(
"6a2c2c86bd54aa6fdf34690a"
);

setStats(
statsRes.data
);

};

return(

  <div>

<ActivityStats
 stats={stats}
/>

<ActivityTimeline
activities={
activities
}
/>

  </div>

);

}