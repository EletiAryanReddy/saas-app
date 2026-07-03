
"use client";

import { useState }
from "react";

import {
createAutomation
}
from "@/services/api/automation.service";

export default function CreateAutomation(){

const [name,setName] =
useState("");

const create =
async()=>{

await createAutomation({

workspaceId:
"6a2c2c86bd54aa6fdf34690a",

name,

trigger:"SCHEDULE",

action:
"GENERATE_REPORT",

createdBy:
"6a2c2bf8bd54aa6fdf346908"

});

};

return(

  <div>

<input
value={name}
onChange={(e)=>
setName(e.target.value)}
/>

<button
onClick={create}>

Create

   </button>

  </div>

);

}
