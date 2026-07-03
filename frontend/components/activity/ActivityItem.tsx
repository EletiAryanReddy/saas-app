
export default function ActivityItem(
{
activity
}:any
){

return(

  <div
   className="border p-3"
  >

   <p>
    {activity.message}
   </p>

   <small>
    {activity.action}
   </small>

  </div>

);

}