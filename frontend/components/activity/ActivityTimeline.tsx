
import ActivityItem
from "./ActivityItem";

export default function ActivityTimeline(
{
activities
}:any
){

return(

  <div>

{
activities.map(
(activity:any)=>(

  <ActivityItem
   key={activity._id}
   activity={activity}
  />

))

}

  </div>

);

}
