
export default function TriggerSelector(
{
value,
onChange
}:any
){

return(

<select
value={value}
onChange={onChange}

>

   <option value="SCHEDULE">
    Schedule
   </option>

   <option value="TASK_CREATED">
    Task Created
   </option>

   <option value="TASK_COMPLETED">
    Task Completed
   </option>

  </select>

);

}