
export default function ErrorLogs(
{
logs
}:any
){

return(

  <div
   className="border rounded p-4"
  >

   <h2>
    Error Logs
   </h2>

{
logs?.map(
(log:any)=>( <div
    key={log._id}
   >
Errors:
{log.errorCount} </div>
))
}

  </div>

);

}

