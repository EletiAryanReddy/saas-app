
import AutomationCard
from "./AutomationCard";

export default function AutomationList(
{
automations
}:any
){

return(

  <div>

{
automations.map(
(automation:any)=>(

  <AutomationCard
   key={automation._id}
   automation={automation}
  />

))
}

  </div>

);

}
