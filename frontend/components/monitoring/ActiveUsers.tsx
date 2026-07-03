
export default function ActiveUsers(
{
health
}:any
){

return(

  <div
   className="border rounded p-4"
  >

   <h2>
    Active Users
   </h2>

   <h1>
    {
      health.activeUsers || 0
    }
   </h1>

  </div>

);

}

