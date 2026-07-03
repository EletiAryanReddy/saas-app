"use client";

import { useState } from "react";

interface Props{
  onSearch:(q:string)=>void;
}

export default function GlobalSearch({
  onSearch
}:Props){

const [query,setQuery] =
useState("");

return(

<div>

<input
placeholder="Search..."
value={query}
onChange={(e)=>
setQuery(e.target.value)
}
/>

<button
onClick={()=>
onSearch(query)
}
>
Search
</button>

</div>

);

}