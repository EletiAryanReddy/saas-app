
export default function StorageUsage(
{
health
}:any
){

return(

  <div
   className="border rounded p-4"
  >

   <h2>
    Storage Usage
   </h2>

   <h1>
    {
      health.storageUsage || 0
    } MB
   </h1>

  </div>

);

}

