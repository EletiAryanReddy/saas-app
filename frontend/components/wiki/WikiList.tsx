"use client";

import Link
from "next/link";

export default function WikiList(
{
 wikis
}:any
){

 return(

  <div>

   {
    wikis.map(
    (wiki:any)=>(

     <div
      key={wiki._id}
      className="border p-3"
     >

      <Link
       href={`/wiki/${wiki._id}`}
      >
       {wiki.title}
      </Link>

     </div>

    ))
   }

  </div>

 );

}