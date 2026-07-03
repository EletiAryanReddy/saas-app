

"use client";

interface Props {

event:any;

onClick?:(
event:any
)=>void;

}

export default function EventCard(
{
event,
onClick
}:Props
){

const formatTime =
(
date:string
) => {

return new Date(
date
).toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
);

};

return(

  <div

onClick={
()=>onClick?.(
event
)
}

className="
p-3
rounded-lg
shadow-sm
border
cursor-pointer
hover:shadow-md
transition
"

style={{
borderLeft:
`5px solid ${
      event.color ||
      "#2563eb"
    }`
}}

>

   <div
    className="
    flex
    justify-between
    items-start
    "
   >


<h3
 className="
 font-semibold
 text-sm
 "
>
 {event.title}
</h3>

<span
 className="
 text-xs
 text-gray-500
 "
>
 {
  event.recurrence
  &&
  event.recurrence
  !== "NONE"
  ?
  event.recurrence
  :
  ""
 }
</span>


   </div>

   <p
    className="
    text-xs
    text-gray-600
    mt-1
    line-clamp-2
    "
   >
    {
      event.description
    }
   </p>

   <div
    className="
    mt-3
    flex
    justify-between
    text-xs
    text-gray-500
    "
   >


<span>

 {
  formatTime(
   event.startTime
  )
 }

 {" - "}

 {
  formatTime(
   event.endTime
  )
 }

</span>

<span>

 👥

 {
  event.participants
  ?.length || 0
 }

</span>


   </div>

   <div
    className="
    mt-2
    flex
    justify-between
    items-center
    "
   >


<span
 className="
 text-xs
 text-orange-600
 "
>

 ⏰

 {
  event.reminder
 }

 min reminder

</span>


   </div>

  </div>

);

}
