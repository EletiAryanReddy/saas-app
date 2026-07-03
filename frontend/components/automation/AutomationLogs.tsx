
export default function AutomationLogs(
{
logs
}:any
){

return(

  <div>

{
logs.map(
(log:any,index:number)=>(


  <div key={index}>

   {log.message}

  </div>

))


}

  </div>

);

}
