
export default function AutomationCard(
{
automation
}:any
){

return(

  <div>

   <h3>
    {automation.name}
   </h3>

   <p>
    {automation.trigger}
   </p>

   <p>
    {automation.action}
   </p>

  </div>

);

}
