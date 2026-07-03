

export default function ActivityStats(
{
stats
}:any
){

return(

  <div>

   <h3>
    Total Activities
   </h3>

   <p>
    {stats.totalActivities}
   </p>

  </div>

);

}