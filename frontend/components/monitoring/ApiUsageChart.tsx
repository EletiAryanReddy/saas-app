
export default function ApiUsageChart(
{
usage
}:any
){

return(

  <div
   className="border rounded p-4"
  >

   <h2>
    API Usage
   </h2>

{
usage?.map(
(item:any)=>( <div
    key={item._id}
   >
{item.apiRequests} </div>
))
}

  </div>

);

}
